import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';  
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SiteadminService {

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  VerifyDuplicateContact(contact, locationid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/VerifyDuplicateContact/'+contact+'/'+locationid).pipe(map(data => {
      return data;
    }));
  }

  getLocationsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getLocationsList/').pipe(map(data => {
      return data;
    }));
  }

  getManagersList(locationid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getManagersList/'+locationid).pipe(map(data => {
      return data;
    }));
  }

  getLocationDetails(locationid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getLocationDetails/'+locationid).pipe(map(data => {
      return data;
    }));
  }

  saveLocationDetails(locationDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveLocationDetails/',locationDetails).pipe(map(data => {
      return data;
  }));
  }

  // MANUFATURELS
  getManufacturelsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getManufacturelsList/').pipe(map(data => {
      return data;
    }));
  }


  getmanufacturelDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getmanufacturelDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  invokeManufacturelsList = new EventEmitter();    
  subsmanufacturelsList: Subscription;  

  EmitManufacturelsList(){
    this.invokeManufacturelsList.emit();
  }

  saveManufacturelDetails(manufacturelDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveManufacturelDetails/',manufacturelDetails).pipe(map(data => {
      return data;
  }));
  }

  UploadManufacturalData(manufacturelDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/UploadManufacturalData/',manufacturelDetails).pipe(map(data => {
      return data;
  }));
  }

  // CATAGORY

  getCatagoriesList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getCatagoriesList/').pipe(map(data => {
      return data;
    }));
  }


  getCatagoryDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getCatagoryDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  invokeCatagoriesList = new EventEmitter();    
  subsCatagoriesList: Subscription;  

  EmitCatagoriesList(){
    this.invokeCatagoriesList.emit();
  }

  saveCatagoryDetails(CatagoryDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveCatagoryDetails/',CatagoryDetails).pipe(map(data => {
      return data;
  }));
  }

  UploadCatagoriesData(catagoryDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/UploadCatagoriesData/',catagoryDetails).pipe(map(data => {
      return data;
  }));
  }


  // MEGAPACKS

  getMegapacksList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getMegapacksList/').pipe(map(data => {
      return data;
    }));
  }


  getprodctUnits():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getprodctUnits/').pipe(map(data => {
      return data;
    }));
  }


  getMegapackProductDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getMegapackProductDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  getMegapackDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getMegapackDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  saveMegapackDetails(CatagoryDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveMegapackDetails/',CatagoryDetails).pipe(map(data => {
      return data;
  }));
  }


  // PRODUCTS

  getProductsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getProductsList/').pipe(map(data => {
      return data;
    }));
  }


  getProductDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getProductDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  invokeProductsList = new EventEmitter();    
  subsProductsList: Subscription;  

  EmitProductsList(){
    this.invokeProductsList.emit();
  }

  invokeProductUnitsList = new EventEmitter();    
  subsProductUnitsList: Subscription;  

  EmitProductUnitsList(){
    this.invokeProductUnitsList.emit();
  }

  saveProductDetails(CatagoryDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveProductDetails/',CatagoryDetails).pipe(map(data => {
      return data;
  }));
  }

  
  UploadProductsData(productsDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/UploadProductsData/',productsDetails).pipe(map(data => {
      return data;
  }));
  }

  // PRODUCTS

  getProductUnitsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getProductUnitsList/').pipe(map(data => {
      return data;
    }));
  }


  getProductUnitDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getProductUnitDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  getProductUnitImages(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getProductUnitImages/'+id).pipe(map(data => {
      return data;
    }));
  }

  deleteProductImage(imgDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/deleteProductImage/',imgDetails).pipe(map(data => {
      return data;
  }));
  }

  getUnitsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getUnitsList/').pipe(map(data => {
      return data;
    }));
  }

  saveProductUnitDetails(ProductUnitDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveProductUnitDetails/',ProductUnitDetails).pipe(map(data => {
      return data;
  }));
  }

    
  uploadProductUnitsImages(unitImages):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/uploadProductUnitsImages/',unitImages, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map(data => {
      return data;
  }));
  }

  UploadProductUnitsData(productsDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/UploadProductUnitsData/',productsDetails).pipe(map(data => {
      return data;
  }));
  }


  // STOCK POINTS

  getStockPointsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getStockPointsList/').pipe(map(data => {
      return data;
    }));
  }

  getStockPointDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getStockPointDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  saveStockPointDetails(stockpointDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveStockPointDetails/',stockpointDetails).pipe(map(data => {
      return data;
  }));
  }

  invokeStockPointList = new EventEmitter();    
  subsStcokPointsList: Subscription;  

  EmitStcokPointsList(){
    this.invokeStockPointList.emit();
  }

  stock_VerifyDuplicateContact(contact, stockpointid):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/stock_VerifyDuplicateContact/'+contact+'/'+stockpointid).pipe(map(data => {
      return data;
    }));
  }

  // VENDORS
  getVendorsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getVendorsList/').pipe(map(data => {
      return data;
    }));
  }
  saveVendorDetails(vendorDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveVendorDetails/',vendorDetails).pipe(map(data => {
      return data;
  }));
  }
  getVendorDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getVendorDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  // OFFERS
  getOffersList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getOffersList/').pipe(map(data => {
      return data;
    }));
  }
  saveOfferDetails(offerDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveOfferDetails/',offerDetails).pipe(map(data => {
      return data;
  }));
  }
  getOfferDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getOfferDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  // PURCHASE
  getPurchaseList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getPurchaseList/').pipe(map(data => {
      return data;
    }));
  }
  savePurchaseDetails(purchaseDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/savePurchaseDetails/',purchaseDetails).pipe(map(data => {
      return data;
  }));
  }

  getProductUnitsOnProduct(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getProductUnitsOnProduct/'+id).pipe(map(data => {
      return data;
    }));
  }

  getPurchaseDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getPurchaseDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  deletePurchaseItem(id):Observable<any>
  {
    return this.httpClient.delete<any>(environment.endpoint_url+'/api/deletePurchaseItem/'+id).pipe(map(data => {
      return data;
    }));
  }


  // GOODS RECIEPTS
  getGoodsRecieptsList():Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getGoodsRecieptsList/').pipe(map(data => {
      return data;
    }));
  }
  saveGoodsRecieptsDetails(purchaseDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/saveGoodsRecieptsDetails/',purchaseDetails).pipe(map(data => {
      return data;
  }));
  }

  updateGoodsRecieptsDetails(goodsDetails):Observable<any>
  {
    return this.httpClient.post(environment.endpoint_url+'/api/updateGoodsRecieptsDetails/',goodsDetails).pipe(map(data => {
      return data;
  }));
  }

  getGoodsRecieptDetails(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/getGoodsRecieptDetails/'+id).pipe(map(data => {
      return data;
    }));
  }

  verifyGoodsEntryExist(id):Observable<any>
  {
    return this.httpClient.get<any>(environment.endpoint_url+'/api/verifyGoodsEntryExist/'+id).pipe(map(data => {
      return data;
    }));
  }


}
