import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../common-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class OrderentryService {

  private apiUrl: string;
  private lists: string;
  private listsOrder: string;
  private processing: string;
  private deletion: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "orderEntry/0/listing/";
    this.listsOrder = this.apiUrl + "orderEntry/0/listing_order/";
    this.processing = this.apiUrl + "orderEntry/0/processing/";
    this.deletion = this.apiUrl + "orderEntry/0/deletion/";
  }

  // List all/particular Customer
  listsOrderEntryOrder(id: any){
    return axios.get(this.listsOrder.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }

  // List all/particular Customer
  listsOrderentry(id: any){
    return axios.get(this.lists.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Create/Update Customer
  processOrderentry(data: any, id: any){
    return axios.post(this.processing.replace('0', id), data, {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Delete particular Customer
  deleteOrderentry(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }
}
