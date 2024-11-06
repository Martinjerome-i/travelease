import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import { PaymenttosupplierService } from '../../common-service/paymenttosupplier/paymenttosupplier.service';
import swal from 'sweetalert';
import { SupplierService } from '../../common-service/supplier/supplier.service';
import { OrderentryService } from '../../common-service/orderentry/orderentry.service';
import { PaymentModeService } from '../../common-service/payment-mode/payment-mode.service';
import { customerCommonInterface, orderCommonInterface, paymentModeChoicesCommonInterface, paymentCollectionCommonInterface, SupplierPaymentCommonInterface, supplierCommonInterface} from '../../interfaces/interfaces';
import { PaymentcollectionService } from '../../common-service/paymentcollection/paymentcollection.service';

@Component({
  selector: 'app-process-paymenttosupplier',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    CommonModule
  ],
  templateUrl: './process-paymenttosupplier.component.html',
  styleUrl: './process-paymenttosupplier.component.css'
})
export class ProcessPaymenttosupplierComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  paymentInfo: paymentCollectionCommonInterface | null = null;
  

  supplierList: supplierCommonInterface [] = []
  supplierSelected: any;

  orderListing: orderCommonInterface [] = []
  orderList: orderCommonInterface [] = []
  orderSelected: any;

  paymentList: paymentModeChoicesCommonInterface [] = []
  paymentSelectedOne: any;
  paymentSelectedTwo: any;
  paymentSelectedThree: any;

  paymentcollectionList: paymentCollectionCommonInterface[] = []
  paymentcollectionSelected: any;

  supplierpaymentList: SupplierPaymentCommonInterface[] = []
  supplierpaymentSelected: any;

  supplierAmountToBePaid: number = 0
  supplierAmountPaid: number = 0
  supplierAmountPending: number = 0

  constructor(private formBuilder:FormBuilder, 
    private router: Router, 
    private paymentcollectionService: PaymentcollectionService,
    private supplierService: SupplierService,
    private orderService: OrderentryService,
    private paymentModeService: PaymentModeService,
    private paymenttosupplierService: PaymenttosupplierService,
  ) {
    this.getSuppliers();
    this.getPayment();
    this.getOrder();
  }

  getCollection(payment:any) {

    this.paymentcollectionList = payment.map((item:paymentCollectionCommonInterface) =>({
      "id": item.id,
      "customerPaymentId": item.customerPaymentId,
      "orderPaymentId": item.orderPaymentId,
      "customerEstimatedFirstPayment": item.customerEstimatedFirstPayment,
      "customerEstimatedFirstPaymentDate": item.customerEstimatedFirstPaymentDate,
      "customerEstimatedSecondPayment": item.customerEstimatedSecondPayment,
      "customerEstimatedSecondPaymentDate": item.customerEstimatedSecondPaymentDate,
      "customerEstimatedThirdPayment": item.customerEstimatedThirdPayment,
      "customerEstimatedThirdPaymentDate": item.customerEstimatedThirdPaymentDate,
      "customerActualFirstPayment": item.customerActualFirstPayment,
      "customerActualFirstPaymentDate": item.customerActualFirstPaymentDate,
      "customerActualFirstPaymentMode": item.customerActualFirstPaymentMode,
      "customerActualSecondPayment": item.customerActualSecondPayment,
      "customerActualSecondPaymentDate": item.customerActualSecondPaymentDate,
      "customerActualSecondPaymentMode": item.customerActualSecondPaymentMode,
      "customerActualThirdPayment": item.customerActualThirdPayment,
      "customerActualThirdPaymentDate": item.customerActualThirdPaymentDate,
      "customerActualThirdPaymentMode": item.customerActualThirdPaymentMode,
      "customerAmountToBePaid": item.customerAmountToBePaid,
      "customerAmountPaid": item.customerAmountPaid,
      "customerPendingAmount": item.customerPendingAmount,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    this.f['customerEstimatedFirstPayment'].setValue(this.paymentcollectionList[0].customerEstimatedFirstPayment)
    this.f['customerEstimatedFirstPaymentDate'].setValue(this.paymentcollectionList[0].customerEstimatedFirstPaymentDate)
    this.f['customerEstimatedSecondPayment'].setValue(this.paymentcollectionList[0].customerEstimatedSecondPayment)
    this.f['customerEstimatedSecondPaymentDate'].setValue(this.paymentcollectionList[0].customerEstimatedSecondPaymentDate)
    this.f['customerEstimatedThirdPayment'].setValue(this.paymentcollectionList[0].customerEstimatedThirdPayment)
    this.f['customerEstimatedThirdPaymentDate'].setValue(this.paymentcollectionList[0].customerEstimatedThirdPaymentDate)
  }



  getSupplier(supplier:any) {

    this.supplierpaymentList = supplier.map((item:SupplierPaymentCommonInterface) =>({
      "id": item.id,
      "paymentSupplier": item.paymentSupplier,
      "paymentOrderId": item.paymentOrderId,
      "supplierEstimatedFirstPayment": item.supplierEstimatedFirstPayment,
      "supplierEstimatedFirstPaymentDate": item.supplierEstimatedFirstPaymentDate,
      "supplierEstimatedSecondPayment": item.supplierEstimatedSecondPayment,
      "supplierEstimatedSecondPaymentDate": item.supplierEstimatedSecondPaymentDate,
      "supplierEstimatedThirdPayment": item.supplierEstimatedThirdPayment,
      "supplierEstimatedThirdPaymentDate": item.supplierEstimatedThirdPaymentDate,
      "supplierActualFirstPayment": item.supplierActualFirstPayment,
      "supplierActualFirstPaymentDate": item.supplierActualFirstPaymentDate,
      "supplierActualSecondPayment": item.supplierActualSecondPayment,
      "supplierActualSecondPaymentDate": item.supplierActualSecondPaymentDate,
      "supplierActualThirdPayment": item.supplierActualThirdPayment,
      "supplierActualThirdPaymentDate": item.supplierActualThirdPaymentDate,
      "supplierAmountToBePaid": item.supplierAmountToBePaid,
      "supplierAmountPaid": item.supplierAmountPaid,
      "supplierPendingAmount": item.supplierPendingAmount,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
  }


  async getSuppliers() {
    const response = await this.supplierService.listsSupplier("0");
    console.log(response.data);

    this.supplierList = response.data.data.map((item:supplierCommonInterface) =>({
      "id": item.id,
      "nameOfSupplier": item.nameOfSupplier,
      "gstNo": item.gstNo,
      "contact": item.contact,
      "email": item.email,
      "address": item.address,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    var supplierId = localStorage.getItem("id");
    this.supplierSelected = supplierId;
  }

  async getOrder() {
    const response = await this.orderService.listsOrderentry("0");
    console.log(response.data);

    this.orderListing = response.data.data.map((item:orderCommonInterface) =>({
      "id": item.id,
      "orderEntryDate": item.orderEntryDate,
      "orderId": item.orderId,
      "destination": item.destination,
      "route": item.route,
      "dateOfTravel": item.dateOfTravel,
      "pricePerPax": item.pricePerPax,
      "noOfPax": item.noOfPax,
      "totalOrderValue": item.totalOrderValue,
      "customerOrderName": item.customerOrderName,
      "orderPaymentMode": item.orderPaymentMode,
      "supplierModeOfService": item.supplierModeOfService,
      "orderVisaService": item.orderVisaService,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    // console.log(this.customerList)
    var supplierId = localStorage.getItem("id");
    this.setOrderUSer(this.orderListing, supplierId);
  }

  onChange() {
    var supplierId = this.supplierSelected;
    this.setOrderUSer(this.orderListing, supplierId);
  }

  setOrderUSer(orderListing: orderCommonInterface [], supplierId: any) {
    for (let item of orderListing) {
      if (item.orderId.toString() == supplierId) {
        this.orderList.push({
          "id": item.id,
          "orderEntryDate": item.orderEntryDate,
          "orderId": item.orderId,
          "destination": item.destination,
          "route": item.route,
          "dateOfTravel": item.dateOfTravel,
          "pricePerPax": item.pricePerPax,
          "noOfPax": item.noOfPax,
          "totalOrderValue": item.totalOrderValue,
          "customerOrderName": item.customerOrderName,
          "orderPaymentMode": item.orderPaymentMode,
          "supplierModeOfService": item.supplierModeOfService,
          "orderVisaService": item.orderVisaService,
          "hideStatus": item.hideStatus,
          "createdAt": item.createdAt,
          "updatedAt": item.updatedAt,
        });
      }
    }
  }

  onChangeOrder() {
    var orderId = this.orderSelected;
    this.changeOrder(orderId)
  }

  async changeOrder(orderId:any){
    const response = await this.orderService.listsOrderEntryOrder(orderId);
    console.log(response.data);
    this.getCollection(response.data.data['payment']);
    this.getSupplier(response.data.data['supplier']);
  }

  async getPayment() {
    const response = await this.paymentModeService.listsPaymentChoices("0");
    console.log(response.data);

    this.paymentList = response.data.data.map((item:paymentModeChoicesCommonInterface) =>({
      "id": item.id,
      "orderChoices": item.orderChoices,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    this.paymentSelectedOne = this.paymentList[0].id;
    this.paymentSelectedTwo = this.paymentList[0].id;
    this.paymentSelectedThree = this.paymentList[0].id;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      supplierEstimatedFirstPaymentDate: ['', Validators.required],
      supplierEstimatedFirstPayment: ['0', Validators.required],
      supplierEstimatedSecondPaymentDate: ['', Validators.required],
      supplierEstimatedSecondPayment: ['0', Validators.required],
      supplierEstimatedThirdPaymentDate: ['', Validators.required],
      supplierEstimatedThirdPayment: ['0', Validators.required],
      supplierActualFirstPayment: ['0', Validators.required],
      supplierActualFirstPaymentDate: ['', Validators.required],
      supplierActualSecondPayment: ['0', Validators.required],
      supplierActualSecondPaymentDate: ['', Validators.required],
      supplierActualThirdPayment: ['0', Validators.required],
      supplierActualThirdPaymentDate: ['', Validators.required],
    });

  }

  changeAmountVal() {
    this.calculatesupplierAmountToBePaid();
    this.calculatesupplierAmountPaid();
    this.calculatesupplierPendingAmount();
  }

  private calculatesupplierAmountToBePaid() {
    const firstPayment = this.form.get('supplierEstimatedFirstPayment')?.value || 0;
    const secondPayment = this.form.get('supplierEstimatedSecondPayment')?.value || 0;
    const thirdPayment = this.form.get('supplierEstimatedThirdPayment')?.value || 0;

    this.supplierAmountToBePaid = Number(firstPayment) + Number(secondPayment) + Number(thirdPayment);
  }
  private calculatesupplierAmountPaid() {
    const firstPayment = this.form.get('supplierActualFirstPayment')?.value || 0;
    const secondPayment = this.form.get('supplierActualSecondPayment')?.value || 0;
    const thirdPayment = this.form.get('supplierActualThirdPayment')?.value || 0;

    this.supplierAmountPaid = Number(firstPayment) + Number(secondPayment) + Number(thirdPayment);
  }

  private calculatesupplierPendingAmount() {    
    this.supplierAmountPending =  this.supplierAmountToBePaid - this.supplierAmountPaid;
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log("working");
    this.submitted = true;
    // var userId = localStorage.getItem("userID");

    var data = {
      "supplierActualFirstPayment": this.f['supplierActualFirstPayment'].value,
      "supplierActualFirstPaymentDate": this.f['supplierActualFirstPaymentDate'].value,
      "supplierActualSecondPayment": this.f['supplierActualSecondPayment'].value,
      "supplierActualSecondPaymentDate": this.f['supplierActualSecondPaymentDate'].value,
      "supplierActualThirdPayment": this.f['supplierActualThirdPayment'].value,
      "supplierActualThirdPaymentDate": this.f['supplierActualThirdPaymentDate'].value,
      "supplierActualFirstPaymentMode": this.paymentSelectedOne,
      "supplierActualSecondPaymentMode": this.paymentSelectedTwo,
      "supplierActualThirdPaymentMode": this.paymentSelectedThree,
      "supplierAmountPaid": this.supplierAmountPaid,
      "supplierPendingAmount": this.supplierAmountPending,
      "supplierPaymentId": this.supplierSelected,
      "orderPaymentId": this.orderSelected,
      "hideStatus": 0,
    }

    var id = "0";
    this.paymenttosupplierService
      .updatePaymentToSupplier(data, id)
      .then(response => {
        if (response.data['code'] == 1) {
          // Success
          // localStorage.setItem('customerId', response.data['customerId']);
          // var customerId= localStorage.getItem('customerId');
          swal("Added!", response.data['message'], "success").then(() => {
            // window.history.back();
            this.router.navigateByUrl('/');
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