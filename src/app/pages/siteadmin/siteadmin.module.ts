import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../../shared/material-modules';
import { SiteadminRoutingModule } from './siteadmin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { FileUploadModule } from 'ng2-file-upload';
import { ImagePreview } from '../../helper/image-directice';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { ProductsListComponent, ProductDetails, UploadProductsDetails } from './products-list/products-list.component';
import { CatagoriesListComponent, CatagoryDetails, UploadCatagoriesDetails } from './catagories-list/catagories-list.component';
import { ManufacturelsComponent,ManufacturelDetails, UploadManufacturelDetails } from './manufacturels/manufacturels.component';
import { ProductUnitsListComponent, UploadProductUnitsDetails, UploadProductUnitsImages } from './product-units-list/product-units-list.component';
import { ProductUnitDetailsComponent } from './product-unit-details/product-unit-details.component';
import { StockPointsComponent, StockPointDetails } from './stock-points/stock-points.component';
import {ChartModule} from 'primeng/chart';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OffersDetailsComponent } from './offers-details/offers-details.component';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsDetailsComponent } from './goods-details/goods-details.component';
import { CustomersFeedbackComponent } from './customers-feedback/customers-feedback.component';
import { GoodsEntryComponent } from './goods-entry/goods-entry.component';
import { MegaPacksComponent } from './mega-packs/mega-packs.component';
import { MegaPacksDetailsComponent } from './mega-packs-details/mega-packs-details.component';

import { SearchPipe } from '../../helper/search.pipe';

@NgModule({
  declarations: [ImagePreview, DashboardComponent, UsersListComponent, UserDetailsComponent, LocationsListComponent, LocationDetailsComponent, ProductsListComponent, ProductDetails, UploadProductsDetails, CatagoriesListComponent, CatagoryDetails, UploadCatagoriesDetails, ManufacturelsComponent, ManufacturelDetails, UploadManufacturelDetails, ProductUnitsListComponent, UploadProductUnitsDetails, UploadProductUnitsImages, ProductUnitDetailsComponent, StockPointsComponent, StockPointDetails, OffersListComponent, OffersDetailsComponent, VendorsListComponent, VendorDetailsComponent, PurchaseListComponent, PurchaseDetailsComponent, GoodsListComponent, GoodsDetailsComponent, CustomersFeedbackComponent, GoodsEntryComponent, MegaPacksComponent, MegaPacksDetailsComponent, SearchPipe],
  imports: [
    CommonModule,
    SiteadminRoutingModule,
    MaterialModules,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AgGridModule.withComponents([]),
    ChartModule
  ]
})
export class SiteadminModule { }
