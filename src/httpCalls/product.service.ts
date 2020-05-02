import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product, hits } from './Product';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  categoryData : string;
  categories: string[];
  productId : string;
  hits: hits[];

  baseurl = 'http://ec2-52-15-43-174.us-east-2.compute.amazonaws.com:8081';
  baseurlNoCatch = 'http://ec2-52-15-43-174.us-east-2.compute.amazonaws.com:8080';
  searchUrl = "https://search-products-mj3cc5h6agzzsyttgphf4fb2kq.us-east-2.es.amazonaws.com/products";
  //baseurl = 'http://localhost:8081';
  //baseurlNoCatch = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  // GET All Products
  GetAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl + '/ecommerce/getAllProducts/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET Categories
  GetAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.baseurlNoCatch + '/getProductCategories/')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET Products by category
  GetProductsByCategory(category): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl + '/ecommerce/getProductByCategory/' + category)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET Products details
  GetProductDetails(id): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseurl + '/ecommerce/getProductDetails?id=' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET Products search Results
  GetSearchResults(query): Observable<any> {
    return this.http.get<any>(this.searchUrl + '/_search?q=' + query)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }

}
