import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../common-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "supplier/0/listing/";
    this.processing = this.apiUrl + "supplier/0/processing/";
    this.deletion = this.apiUrl + "supplier/0/deletion/";
  }

  // List all/particular Supplier
  listsSupplier(id: any){
    return axios.get(this.lists.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Create/Update Supplier
  processSupplier(data: any, id: any){
    return axios.post(this.processing.replace('0', id), data, {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Delete particular Supplier
  deleteSupplier(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }
}
