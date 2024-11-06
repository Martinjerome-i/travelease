import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import { PaymentcollectionService } from '../../common-service/paymentcollection/paymentcollection.service';
import { CustomerService } from '../../common-service/customer/customer.service';
import swal from 'sweetalert';
import { OrderentryService } from '../../common-service/orderentry/orderentry.service';
import { PaymentModeService } from '../../common-service/payment-mode/payment-mode.service';
import { customerCommonInterface, orderCommonInterface, paymentModeChoicesCommonInterface, paymentCollectionCommonInterface, SupplierPaymentCommonInterface} from '../../interfaces/interfaces';
import { PaymenttosupplierService } from '../../common-service/paymenttosupplier/paymenttosupplier.service';

@Component({
  selector: 'app-process-paymentcollection',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './process-paymentcollection.component.html',
  styleUrl: './process-paymentcollection.component.css'
})
export class ProcessPaymentcollectionComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  paymentInfo: paymentCollectionCommonInterface | null = null;
  

  customerList: customerCommonInterface [] = []
  customerSelected: any;

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

  customerAmountToBePaid: number = 0
  customerAmountPaid: number = 0
  customerAmountPending: number = 0

  constructor(private formBuilder:FormBuilder, 
    private router: Router, 
    private paymentcollectionService: PaymentcollectionService,
    private customerService: CustomerService,
    private orderService: OrderentryService,
    private paymentModeService: PaymentModeService,
    private paymenttosupplierService: PaymenttosupplierService,
  
  ) {
    this.getCustomer();
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
  

  async getCustomer() {
    const response = await this.customerService.listsCustomer("0");
    console.log(response.data);

    this.customerList = response.data.data.map((item:customerCommonInterface) =>({
      "id": item.id,
      "name": item.name,
      "customerId": item.customerId,
      "gstNo": item.gstNo,
      "phoneNumber": item.phoneNumber,
      "mail": item.mail,
      "address": item.address,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    var customerId = localStorage.getItem("customerId");
    // console.log(customerId)
    this.customerSelected = customerId;
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
    var customerId = localStorage.getItem("customerId");
    this.setOrderUSer(this.orderListing, customerId);
  }

  onChange() {
    var customerId = this.customerSelected;
    this.setOrderUSer(this.orderListing, customerId);
  }

  setOrderUSer(orderListing: orderCommonInterface [], customerId: any) {
    for (let item of orderListing) {
      if (item.customerOrderName.toString() == customerId) {
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
      customerEstimatedFirstPaymentDate: ['', Validators.required],
      customerEstimatedFirstPayment: ['0', Validators.required],
      customerEstimatedSecondPaymentDate: ['', Validators.required],
      customerEstimatedSecondPayment: ['0', Validators.required],
      customerEstimatedThirdPaymentDate: ['', Validators.required],
      customerEstimatedThirdPayment: ['0', Validators.required],
      customerActualFirstPayment: ['0', Validators.required],
      customerActualFirstPaymentDate: ['', Validators.required],
      customerActualSecondPayment: ['0', Validators.required],
      customerActualSecondPaymentDate: ['', Validators.required],
      customerActualThirdPayment: ['0', Validators.required],
      customerActualThirdPaymentDate: ['', Validators.required],
    });

  }

  changeAmountVal() {
    this.calculateCustomerAmountToBePaid();
    this.calculateCustomerAmountPaid();
    this.calculateCustomerPendingAmount();
  }

  private calculateCustomerAmountToBePaid() {
    const firstPayment = this.form.get('customerEstimatedFirstPayment')?.value || 0;
    const secondPayment = this.form.get('customerEstimatedSecondPayment')?.value || 0;
    const thirdPayment = this.form.get('customerEstimatedThirdPayment')?.value || 0;

    this.customerAmountToBePaid = Number(firstPayment) + Number(secondPayment) + Number(thirdPayment);
  }
  private calculateCustomerAmountPaid() {
    const firstPayment = this.form.get('customerActualFirstPayment')?.value || 0;
    const secondPayment = this.form.get('customerActualSecondPayment')?.value || 0;
    const thirdPayment = this.form.get('customerActualThirdPayment')?.value || 0;

    this.customerAmountPaid = Number(firstPayment) + Number(secondPayment) + Number(thirdPayment);
  }

  private calculateCustomerPendingAmount() {    
    this.customerAmountPending =  this.customerAmountToBePaid - this.customerAmountPaid;
  }



  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log("working");
    this.submitted = true;
    // var userId = localStorage.getItem("userID");

    var data = {
      "customerActualFirstPayment": this.f['customerActualFirstPayment'].value,
      "customerActualFirstPaymentDate": this.f['customerActualFirstPaymentDate'].value,
      "customerActualSecondPayment": this.f['customerActualSecondPayment'].value,
      "customerActualSecondPaymentDate": this.f['customerActualSecondPaymentDate'].value,
      "customerActualThirdPayment": this.f['customerActualThirdPayment'].value,
      "customerActualThirdPaymentDate": this.f['customerActualThirdPaymentDate'].value,
      "customerActualFirstPaymentMode": this.paymentSelectedOne,
      "customerActualSecondPaymentMode": this.paymentSelectedTwo,
      "customerActualThirdPaymentMode": this.paymentSelectedThree,
      "customerAmountPaid": this.customerAmountPaid,
      "customerPendingAmount": this.customerAmountPending,
      "customerPaymentId": this.customerSelected,
      "orderPaymentId": this.orderSelected,
      "hideStatus": 0,
    }
    // var id = "0";
    this.paymentcollectionService
      .updatePaymentcollection(data, this.orderSelected)
      .then(response => {
        if (response.data['code'] == 1) {
          // Success
          localStorage.setItem('customerId', response.data['customerId']);
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
