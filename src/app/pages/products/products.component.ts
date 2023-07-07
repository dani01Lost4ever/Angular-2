import { Component } from '@angular/core';
import { ProductFilters, ProductService } from 'src/app/services/product.service';
import { getDiscountAmount, getDiscountedPrice } from '../../../utils/cart-utils';
import { Product } from '../../interfaces/product';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, catchError, filter, map, of, startWith, switchMap, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { omitBy } from 'lodash';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {


  private applyFilters$= new Subject<ProductFilters>();
  filters$=this.activatedRoute.queryParams;
  products$= this.filters$.pipe(startWith({}),switchMap(filters=> {return this.productSrv.list(filters).pipe(catchError(err=>of([])))}));

  private destryed$= new Subject<void>();
  constructor(private productSrv: ProductService, private fb: FormBuilder , private router: Router, private activatedRoute: ActivatedRoute) {  }

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
    this.applyFilters$.next(value);
  }

  getDiscoutedPrice(product: Product){
    return getDiscountedPrice(product.netPrice, product.discount);
  }
}
