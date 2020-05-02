import { Component, OnInit } from '@angular/core';
import { Product, hits, Elasticsearch } from 'src/httpCalls/Product';
import { ProductService } from 'src/httpCalls/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-listing',
  templateUrl: './search-listing.component.html',
  styleUrls: ['./search-listing.component.css']
})
export class SearchListingComponent implements OnInit {
  searches: hits[];
  categories: string[] = [];
  products: Product[] = [];
  productId: string;
  category: string;
  elasticSearch: Elasticsearch;
  hits: hits[];

  constructor(public productService: ProductService,private router: Router) { }

  ngOnInit(): void {
    this.productService.GetAllCategories().subscribe(
      res => {
        this.categories = res;
        
      });

    this.searches = this.productService.hits;
    this.category = this.productService.categoryData;
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
        this.searches = this.hits;
        this.category = query;
      });
  }

}
