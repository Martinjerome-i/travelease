import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcessContactpersonComponent } from './process-contactperson/process-contactperson.component';


export const contactpersonRoutes: Routes = [
  // {
  //   path: '',
  //   component: ListSupplierComponent,
  // },
  {
    path: '',
    component: ProcessContactpersonComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(contactpersonRoutes)],
  exports: [RouterModule]
})
export class ContactpersonRoutingModule { }
