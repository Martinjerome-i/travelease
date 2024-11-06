import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessPaymenttosupplierComponent } from './process-paymenttosupplier/process-paymenttosupplier.component';

export const paymenttosupplierRoutes: Routes = [
  // {
  //   path: '',
  //   component: ListSupplierComponent,
  // },
  {
    path: '',
    component: ProcessPaymenttosupplierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(paymenttosupplierRoutes)],
  exports: [RouterModule]
})
export class PaymenttosupplierRoutingModule { }
