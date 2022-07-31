import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/getProductsList').pipe(map(data => {
        return data;
      }));
  }

  getUnitsList(): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/getUnitsList').pipe(map(data => {
        return data;
      }));
  }

getProductCatagoriesList(): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/getProductCatagoriesList').pipe(map(data => {
        return data;
      }));
  }

getCatagoryDetails(id): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/getCatagoryDetails/'+id).pipe(map(data => {
        return data;
      }));
  }

getProductDetails(id): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/getProductDetails/'+id).pipe(map(data => {
        return data;
      }));
  }

getProductunitDetails(id): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/getProductunitDetails/'+id).pipe(map(data => {
        return data;
      }));
  }

getProductimges(id): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/getProductimges/'+id).pipe(map(data => {
        return data;
      }));
  }

deleteProductImage(id): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/deleteProductImage/'+id).pipe(map(data => {
        return data;
      }));
  }

deleteProductUnitDetails(id): Observable<any>
  {
        return this.http.get<any>(environment.endpoint_url+'/api/deleteProductUnitDetails/'+id).pipe(map(data => {
        return data;
      }));
  }

  
  deleteCatagories(catagoryDetails): Observable<any>
  {
    return this.http.post(environment.endpoint_url+'/api/deleteCatagories/',catagoryDetails).pipe(map(data => {
							return data;
					}));
  }

  saveCatagoryDetails(catagoryDetails): Observable<any>
  {
    return this.http.post(environment.endpoint_url+'/api/saveCatagoryDetails/',catagoryDetails).pipe(map(data => {
							return data;
					}));
  }

  saveProductsDetails(productDetails): Observable<any>
  {
    return this.http.post(environment.endpoint_url+'/api/saveProductsDetails/',productDetails).pipe(map(data => {
							return data;
					}));
  }


}
