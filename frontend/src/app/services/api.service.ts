import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getAllProduct(): Observable<any[]> {
    return this.http.get<any[]>(environment.endpoint + "product");
  }
  getCategoryPage(id:any,page: any, perItem: any = 5): Observable<any[]> {
    return this.http.get<any[]>(environment.endpoint + "product/category/" + `${id}/${page}?perItem=${perItem}`);
  }

  getProductCount(): Observable<any[]> {
    return this.http.get<any[]>(environment.endpoint + "pcount");
  }
  getCategoryCount(id:any): Observable<any[]> {
    return this.http.get<any[]>(environment.endpoint + `ccount?id=${id}`);
  }
  getAllCategory(): Observable<any[]> {
    return this.http.get<any[]>(environment.endpoint + "category");
  }

  getProductPage(page: any, perItem: any = 5): Observable<any[]> {
    return this.http.get<any[]>(environment.endpoint + "product/" + `${page}?perItem=${perItem}`);
  }
}
