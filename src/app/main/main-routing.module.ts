import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { supplierRoutes } from './supplier/supplier-routing.module';
import { customerRoutes } from './customer/customer-routing.module';
import { contactpersonRoutes } from './contactperson/contactperson-routing.module';
import { orderentryRoutes } from './orderentry/orderentry-routing.module';
import { paymentcollectionRoutes } from './paymentcollection/paymentcollection-routing.module';
import { paymenttosupplierRoutes } from './paymenttosupplier/paymenttosupplier-routing.module';
import { reportRoutes } from './report/report-routing.module';

export const mainRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'supplier',
    children: supplierRoutes,
  },
  {
    path: 'customer',
    children: customerRoutes,
  },
  {
    path: 'contactperson',
    children: contactpersonRoutes,
  },
  {
    path: 'orderentry',
    children: orderentryRoutes,
  },
  {
    path: 'paymentcollection',
    children: paymentcollectionRoutes,
  },
  {
    path: 'paymenttosupplier',
    children: paymenttosupplierRoutes,
  },
  {
    path: 'report',
    children: reportRoutes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
