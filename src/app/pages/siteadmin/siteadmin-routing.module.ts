import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationDetailsComponent } from './location-details/location-details.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CatagoriesListComponent } from './catagories-list/catagories-list.component';
import { ManufacturelsComponent } from './manufacturels/manufacturels.component';
import { ProductUnitsListComponent } from './product-units-list/product-units-list.component';
import { ProductUnitDetailsComponent } from './product-unit-details/product-unit-details.component';
import { StockPointsComponent } from './stock-points/stock-points.component';
import { OffersListComponent } from './offers-list/offers-list.component';
import { OffersDetailsComponent } from './offers-details/offers-details.component';
import { VendorsListComponent } from './vendors-list/vendors-list.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { PurchaseDetailsComponent } from './purchase-details/purchase-details.component';
import { GoodsListComponent } from './goods-list/goods-list.component';
import { GoodsDetailsComponent } from './goods-details/goods-details.component';
import { GoodsEntryComponent } from './goods-entry/goods-entry.component';
import { CustomersFeedbackComponent } from './customers-feedback/customers-feedback.component';
import { MegaPacksComponent } from './mega-packs/mega-packs.component';
import { MegaPacksDetailsComponent } from './mega-packs-details/mega-packs-details.component';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Siteadmin',
      status: true
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
        
      }, 
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          breadcrumb: 'Dashboard',
          status: true,
          icon: 'dashboard'
        },
      }, 
      {
        path: 'employees',
        component: UsersListComponent,
        data: {
          breadcrumb: 'Employees',
          status: true,
          icon: 'people_alt'
        },
      }, 
      {
        path: 'employee_details/:id',
        component: UserDetailsComponent,
        data: {
          breadcrumb: 'Employee Details',
          status: true,
          icon: 'people_alt'
        },
      }, 
      {
        path: 'locations',
        component: LocationsListComponent,
        data: {
          breadcrumb: 'Locations',
          status: true,
          icon: 'location_on'
        },
      }, 
      {
        path: 'location_details/:id',
        component: LocationDetailsComponent,
        data: {
          breadcrumb: 'Location Details',
          status: true,
          icon: 'location_on'
        },
      }, 
      {
        path: 'products',
        component: ProductsListComponent,
        data: {
          breadcrumb: 'Products',
          status: true,
          icon: 'list'
        },
      }, 
      {
        path: 'catagories',
        component: CatagoriesListComponent,
        data: {
          breadcrumb: 'Catagories',
          status: true,
          icon: 'category'
        },
      }, 
      {
        path: 'manufacturals',
        component: ManufacturelsComponent,
        data: {
          breadcrumb: 'Manufacturals',
          status: true,
          icon: 'store'
        },
      }, 
      {
        path: 'product_units',
        component: ProductUnitsListComponent,
        data: {
          breadcrumb: 'Product Units',
          status: true,
          icon: 'list'
        },
      }, 
      {
        path: 'product_units_details/:id',
        component: ProductUnitDetailsComponent,
        data: {
          breadcrumb: 'Product Unit Details',
          status: true,
          icon: 'list'
        },
      }, 
      {
        path: 'stok_points',
        component: StockPointsComponent,
        data: {
          breadcrumb: 'Stock Point',
          status: true,
          icon: 'domain'
        },
      }, 
      {
        path: 'vendors',
        component: VendorsListComponent,
        data: {
          breadcrumb: 'Vendors',
          status: true,
          icon: 'store'
        },
      }, 
      {
        path: 'vendor_details/:id',
        component: VendorDetailsComponent,
        data: {
          breadcrumb: 'Vendor Details',
          status: true,
          icon: 'store'
        },
      }, 
      {
        path: 'offers',
        component: OffersListComponent,
        data: {
          breadcrumb: 'Offers',
          status: true,
          icon: 'loyalty'
        },
      }, 
      {
        path: 'offer_details/:id',
        component: OffersDetailsComponent,
        data: {
          breadcrumb: 'Offer Details',
          status: true,
          icon: 'loyalty'
        },
      }, 
      {
        path: 'megapacks',
        component: MegaPacksComponent,
        data: {
          breadcrumb: 'Mega Packs',
          status: true,
          icon: 'shopping_basket'
        },
      }, 
      {
        path: 'megapack_details/:id',
        component: MegaPacksDetailsComponent,
        data: {
          breadcrumb: 'Mega Pack Details',
          status: true,
          icon: 'shopping_basket'
        },
      }, 
      {
        path: 'purchase',
        component: PurchaseListComponent,
        data: {
          breadcrumb: 'Purchase Orders',
          status: true,
          icon: 'assignment'
        },
      }, 
      {
        path: 'purchase_details/:id',
        component: PurchaseDetailsComponent,
        data: {
          breadcrumb: 'Purchase Details',
          status: true,
          icon: 'assignment'
        },
      }, 
      {
        path: 'goods_reciept',
        component: GoodsListComponent,
        data: {
          breadcrumb: 'Goods Reciept',
          status: true,
          icon: 'assignment'
        },
      }, 
      {
        path: 'gr_details/:id',
        component: GoodsDetailsComponent,
        data: {
          breadcrumb: 'Goods Reciept Details',
          status: true,
          icon: 'assignment'
        },
      }, 
      {
        path: 'gr_entry/:id',
        component: GoodsEntryComponent,
        data: {
          breadcrumb: 'Goods Reciept Entry',
          status: true,
          icon: 'assignment'
        },
      }, 
      {
        path: 'customer_feedbacks',
        component: CustomersFeedbackComponent,
        data: {
          breadcrumb: 'Customers Feedback/Complaints',
          status: true,
          icon: 'feedback'
        },
      }, 
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteadminRoutingModule { }
