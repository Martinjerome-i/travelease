import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSupplierComponent } from './list-supplier/list-supplier.component';
import { ProcessSupplierComponent } from './process-supplier/process-supplier.component';

export const supplierRoutes: Routes = [
  // {
  //   path: '',
  //   component: ListSupplierComponent,
  // },
  {
    path: '',
    component: ProcessSupplierComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(supplierRoutes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
