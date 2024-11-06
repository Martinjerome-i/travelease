import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../common-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PaymentcollectionService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private update: string;
  private deletion: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "paymentCollection/0/listing/";
    this.processing = this.apiUrl + "paymentCollection/0/processing/";
    this.update = this.apiUrl + "paymentCollection/0/update_order/";
    this.deletion = this.apiUrl + "paymentCollection/0/deletion/";
  }

  // List all/particular Customer
  listsPaymentcollection(id: any){
    return axios.get(this.lists.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Create/Update Customer
  processPaymentcollection(data: any, id: any){
    return axios.post(this.processing.replace('0', id), data, {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Create/Update Customer
  updatePaymentcollection(data: any, id: any){
    return axios.post(this.update.replace('0', id), data, {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Delete particular Customer
  deletePaymentcollection(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }
}


