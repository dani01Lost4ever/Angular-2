import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from "./pages/checkout/checkout.component";
import { ProductsComponent } from "./pages/products/products.component";

const routes: Routes=[{
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "products",
    component: ProductsComponent
  },
  {
    path: "",
    redirectTo: "/products",
    pathMatch: "full"
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
