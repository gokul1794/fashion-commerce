import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/httpCalls/product.service';
import { Product, Elasticsearch, hits } from 'src/httpCalls/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.css']
})
export class ProductListingComponent implements OnInit {
  category: string;
  categories: string[] = [];
  products: Product[] = [];
  productId: string;
  elasticSearch: Elasticsearch;
  hits: hits[];

  constructor(public productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productService.GetAllCategories().subscribe(
      res => {
        this.categories = res;
        
      });

    this.category = this.productService.categoryData;
    this.productService.GetProductsByCategory(this.category).subscribe(
      res => {
        this.products = res;
      });
  }

  getProductByCategory(category){
    this.productService.categoryData = category;
    this.productService.GetProductsByCategory(category).subscribe(
      res => {
        this.products = res;
      });
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
