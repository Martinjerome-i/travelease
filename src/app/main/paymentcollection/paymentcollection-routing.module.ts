import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessPaymentcollectionComponent } from './process-paymentcollection/process-paymentcollection.component';

export const paymentcollectionRoutes: Routes = [
  // {
  //   path: '',
  //   component: ListSupplierComponent,
  // },
  {
    path: '',
    component: ProcessPaymentcollectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(paymentcollectionRoutes)],
  exports: [RouterModule]
})
export class PaymentcollectionRoutingModule { }
