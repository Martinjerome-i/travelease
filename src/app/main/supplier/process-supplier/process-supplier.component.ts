import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {NgClass, NgForOf} from "@angular/common";
import { SupplierService } from '../../common-service/supplier/supplier.service';
import { serviceChoicesCommonInterface } from '../../interfaces/interfaces';
import { ServiceChoiceService } from '../../common-service/service-choice/service-choice.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-process-supplier',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
  templateUrl: './process-supplier.component.html',
  styleUrl: './process-supplier.component.css'
})
export class ProcessSupplierComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  supplierModeOfService: serviceChoicesCommonInterface [] = []
  supplierModeOfServiceSelected: any;

  constructor(private formBuilder:FormBuilder, 
    private router: Router, 
    private supplierService: SupplierService, 
    private serviceChoiceService: ServiceChoiceService
  ) {
    this.getServiceChoices();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nameOfSupplier: ['', Validators.required],
      gstNo: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  async getServiceChoices() {
    const response = await this.serviceChoiceService.listsServiceChoices("0");

    this.supplierModeOfService = response.data.data.map((item:serviceChoicesCommonInterface) =>({
      "id": item.id,
      "serviceChoices": item.serviceChoices,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
  }

  onSubmit() {
    console.log("working");
    this.submitted = true;
    // var userId = localStorage.getItem("userID");

    var data = {
      "nameOfSupplier": this.f['nameOfSupplier'].value,
      "gstNo": this.f['gstNo'].value,
      "contact": this.f['contact'].value,
      "email": this.f['email'].value,
      "address": this.f['address'].value,
      "hideStatus": 0,
      "supplierModeOfService": this.supplierModeOfServiceSelected
    }
    var id = "0";
    this.supplierService
      .processSupplier(data, id)
      .then(response => {
        if (response.data['code'] == 1) {
          // Success
          swal("Added!", response.data['message'], "success").then(function() {
            // window.history.back();
          });
        } else {
          // Error
          swal("Failed!", response.data['message'], "error").then(function() {
            // window.history.back();
          });
        }
        this.loading = false;
      })
      .catch((error) => {
        // Handle login errors
        swal("Failed!", error, "error");
        this.loading = false;
      })
      .finally(() => {
        // Always set loading to false
        this.loading = false;
      });
  }
}
