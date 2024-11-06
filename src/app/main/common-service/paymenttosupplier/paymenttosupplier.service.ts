import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../common-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PaymenttosupplierService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private update: string;
  private deletion: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "paymentToSupplier/0/listing/";
    this.processing = this.apiUrl + "paymentToSupplier/0/processing/";
    this.update = this.apiUrl + "paymentToSupplier/0/update_order/";
    this.deletion = this.apiUrl + "paymentToSupplier/0/deletion/";
  }

  // List all/particular Customer
  listsPaymentToSupplier(id: any){
    return axios.get(this.lists.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Create/Update Customer
  processPaymentToSupplier(data: any, id: any){
    return axios.post(this.processing.replace('0', id), data, {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Create/Update Customer
  updatePaymentToSupplier(data: any, id: any){
    return axios.post(this.update.replace('0', id), data, {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Delete particular Customer
  deletePaymentToSupplier(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }
}

