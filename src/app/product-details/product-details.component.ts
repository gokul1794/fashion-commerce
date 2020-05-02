import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/httpCalls/product.service';
import { Product, Elasticsearch, hits } from 'src/httpCalls/Product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productId: string;
  categories: string[] = [];
  product: Product[];
  category: string;
  elasticSearch: Elasticsearch;
  hits: hits[];

  constructor(public productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productService.GetAllCategories().subscribe(
      res => {
        this.categories = res;
        
      });

    this.category = this.productService.categoryData;
    this.productId = this.productService.productId;
    this.productService.GetProductDetails(this.productId).subscribe(
      res => {
        this.product = res;
      });
  }

  getProductByCategory(category:string){
    this.productService.categoryData = category;
    this.router.navigate(['/productlist/']);
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
