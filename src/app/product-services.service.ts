import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  public dialogref: any;


  private apiUrl = 'https://fakestoreapi.com/products';

     constructor(private http: HttpClient) {}

     getProducts(): Observable<any[]> {
       return this.http.get<any[]>(this.apiUrl);
     }

     getProductById(id: number): Observable<any> {
       return this.http.get<any>(`${this.apiUrl}/${id}`);
     }

     addProduct(product: any): Observable<any> {
       return this.http.post<any>(this.apiUrl, product);
     }

     updateProduct(id: number, product: any): Observable<any> {
       return this.http.put<any>(`${this.apiUrl}/${id}`, product);
     }

     deleteProduct(id: number): Observable<void> {
       return this.http.delete<void>(`${this.apiUrl}/${id}`);
     }
}
