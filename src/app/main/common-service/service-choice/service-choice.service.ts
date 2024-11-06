import { Injectable } from '@angular/core';
import { BaseAPIUrl, baseURLType } from '../common-api-url';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ServiceChoiceService {

  private apiUrl: string;
  private lists: string;
  private processing: string;
  private deletion: string;

  constructor() {
    this.apiUrl = new BaseAPIUrl().getUrl(baseURLType)
    this.lists = this.apiUrl + "serviceChoices/0/listing/";
    this.processing = this.apiUrl + "serviceChoices/0/processing/";
    this.deletion = this.apiUrl + "serviceChoices/0/deletion/";
  }

  // List all/particular ServiceChoices
  listsServiceChoices(id: any){
    return axios.get(this.lists.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Create/Update ServiceChoices
  processServiceChoices(data: any, id: any){
    return axios.post(this.processing.replace('0', id), data, {
      headers:{
        "Token":"Token"
      }
    });
  }

  // Delete particular ServiceChoices
  deleteServiceChoices(id: any){
    return axios.get(this.deletion.replace('0', id), {
      headers:{
        "Token":"Token"
      }
    });
  }
}
