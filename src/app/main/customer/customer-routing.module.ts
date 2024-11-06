import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessCustomerComponent } from './process-customer/process-customer.component';

export const customerRoutes: Routes = [
  // {
  //   path: '',
  //   component: ListSupplierComponent,
  // },
  {
    path: '',
    component: ProcessCustomerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
