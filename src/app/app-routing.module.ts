import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchListingComponent } from './search-listing/search-listing.component';


const routes: Routes = [
  {path : 'home' , component: HomePageComponent},
  {path: 'productlist', component: ProductListingComponent},
  {path: 'details', component: ProductDetailsComponent},
  {path: 'search', component: SearchListingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
