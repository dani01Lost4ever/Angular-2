import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductFilters, ProductService } from 'src/app/services/product.service';
import { getDiscountedPrice } from '../../../utils/cart-utils';
import { Product } from '../../interfaces/product';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject, catchError, combineLatest, map, of, switchMap, take, takeUntil, tap, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy, pick, result } from 'lodash';
import { SideCartService } from 'src/app/services/side-cart.service';
import { SideCartUpdateService } from 'src/app/services/side-cart-update.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  public quantity: number=0;
  public addedItem: string[] = [];
  showItemAddedLabel: boolean = false;
  constructor(private productSrv: ProductService, private fb: FormBuilder , private router: Router, private activatedRoute: ActivatedRoute, private cartUpdateService: SideCartUpdateService) {  }
  @ViewChild('quantityInput') quantityInput!: ElementRef<HTMLInputElement>;
  private applyFilters$= new Subject<ProductFilters>();
  filters$=this.activatedRoute.queryParams.pipe(
    map(params => pick(params, ['name','minPrice','maxPrice'])),
  );

  // Create a BehaviorSubject to track the current page
  currentPage$ = new BehaviorSubject<number>(1);
  totalPages$ = this.filters$.pipe(
    switchMap(filters => this.productSrv.count(filters)),
    map(totalProducts => Math.ceil(totalProducts / this.itemsPerPage)),
    catchError(() => of(0)) // Handle error gracefully
  );
  itemsPerPage = 24;
  // Combine filters$ and currentPage$ observables
  combined$ = combineLatest([this.filters$, this.currentPage$]);
  // Update the products$ observable using combined$ observable
  products$ = this.combined$.pipe(
    switchMap(([filters, currentPage]) =>
      this.productSrv.list(filters).pipe(
        map(products => {
          const startIndex = (currentPage - 1) * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          return products.slice(startIndex, endIndex);
        }),
        catchError(err => of([]))
      )
    )
  );

  // Add the previousPage() and nextPage() methods
  previousPage() {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }
  nextPage() {
    const itemsPerPage = this.itemsPerPage;
    const currentPage = this.currentPage$.value;
    this.filters$.pipe(take(1)).subscribe(filters => {
      this.productSrv.count(filters).subscribe(totalProducts => {
        const totalPages = Math.ceil(totalProducts / this.itemsPerPage);

        if (currentPage < totalPages) {
          this.currentPage$.next(currentPage + 1);
        }
      });
    });
  }
  //products$= this.filters$.pipe(startWith({}),switchMap(filters=> {return this.productSrv.list(filters).pipe(catchError(err=>of([])))}));

  private destryed$= new Subject<void>();

  ngOnInit(): void {
    this.applyFilters$.pipe(
        takeUntil(this.destryed$), map(value=>omitBy(value, val=>val==='')))
        .subscribe(filters=>
            {this.router.navigate([], {queryParams: filters});
        }
    );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destryed$.next();
    this.destryed$.complete();
  }

  filtersChanged(value: ProductFilters){
    this.currentPage$.next(1);
    this.applyFilters$.next(value);

  }

  getDiscoutedPrice(product: Product){
    return getDiscountedPrice(product.netPrice, product.discount);
  }

  updateQuantity(event: Event): void{
    const inputElement = event.target as HTMLInputElement;
    this.quantity = Number(inputElement.value);
  }

  addItemToCart(id: string){
    this.productSrv.addToCart(id, this.quantity).subscribe(() => {
      this.addedItem.push(id);
      timer(1000)
        .pipe(take(1))
        .subscribe(() => {
          this.addedItem = this.addedItem.filter(itemId => itemId !== id);
          this.products$ = this.products$.pipe(
            take(1),
            map((product) => product.filter(item => !this.addedItem.includes(item.id)))
          );
        });
    });
    this.cartUpdateService.notifyCartUpdated();
    this.quantity=0;
  }
}
