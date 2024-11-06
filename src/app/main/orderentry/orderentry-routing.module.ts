import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessOrderentryComponent } from './process-orderentry/process-orderentry.component';

export const orderentryRoutes: Routes = [
  // {
  //   path: '',
  //   component: ListSupplierComponent,
  // },
  {
    path: '',
    component: ProcessOrderentryComponent,
  },
];


@NgModule({
  imports: [RouterModule.forChild(orderentryRoutes)],
  exports: [RouterModule]
})
export class OrderentryRoutingModule { }
