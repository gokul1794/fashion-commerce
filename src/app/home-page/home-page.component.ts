import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/httpCalls/product.service';
import { Product, Elasticsearch, hits } from 'src/httpCalls/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public url = 'https://search-products-mj3cc5h6agzzsyttgphf4fb2kq.us-east-2.es.amazonaws.com/products/_search?q=';
  public search = '';

  categories: string[] = [];
  products: Product[] = [];
  elasticSearch: Elasticsearch;
  hits: hits[];

  constructor(public productService: ProductService,private router: Router) {
   }

  ngOnInit(): void {
    this.productService.GetAllCategories().subscribe(
      res => {
        this.categories = res;
        
      });

    this.productService.GetProductsByCategory("Jacket").subscribe(
      res => {
        this.products = res;
      });
  }

  getProductByCategory(category:string){
    this.productService.categoryData = category;
    this.router.navigate(['/productlist/']);
  }

  showProductDetails(id: string){
    this.productService.productId = id;
    this.router.navigate(['/details/']);
  }

  searchProducts(query:string){
    this.productService.GetSearchResults(query).subscribe(
      res => {
        this.elasticSearch = res.hits;
        this.hits = this.elasticSearch.hits;
        this.productService.hits = this.hits;
        this.productService.categoryData = query;
        this.router.navigate(['/search/']);
      });
  }
  

}
