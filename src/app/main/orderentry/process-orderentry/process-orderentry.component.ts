import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import { OrderentryService } from '../../common-service/orderentry/orderentry.service';
import { customerCommonInterface, serviceChoicesCommonInterface, paymentModeChoicesCommonInterface, visaChoicesCommonInterface, supplierCommonInterface } from '../../interfaces/interfaces';
import { ServiceChoiceService } from '../../common-service/service-choice/service-choice.service';
import swal from 'sweetalert';
import { ProcessPaymentcollectionComponent } from "../../paymentcollection/process-paymentcollection/process-paymentcollection.component";
import { CustomerService } from '../../common-service/customer/customer.service';
import { VisaServiceService } from '../../common-service/visa-service/visa-service.service';
import { PaymentModeService } from '../../common-service/payment-mode/payment-mode.service';
import { SupplierService } from '../../common-service/supplier/supplier.service';

@Component({
    selector: 'app-process-orderentry',
    standalone: true,
    templateUrl: './process-orderentry.component.html',
    styleUrl: './process-orderentry.component.css',
    imports: [
        NgForOf,
        ReactiveFormsModule,
        NgClass,
        FormsModule,
        ProcessPaymentcollectionComponent
    ],
})

export class ProcessOrderentryComponent implements OnInit {
  currentStep: number = 0;
  customerName: string = '';
  supplierName: string = '';
  form!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  supplierModeOfService: serviceChoicesCommonInterface [] = []
  supplierModeOfServiceSelected: any;

  customerList: customerCommonInterface [] = []
  customerSelected: any;

  supplierList: supplierCommonInterface [] = []
  supplierFilterList: supplierCommonInterface [] = []
  supplierSelected: any;

  visaList: visaChoicesCommonInterface [] = []
  visaSelected: any;

  paymentList: paymentModeChoicesCommonInterface [] = []
  paymentSelected: any;

  nextStep() {
    this.currentStep++;
  }

  prevStep() {
    this.currentStep--;
  }

  constructor(
    private formBuilder:FormBuilder, 
    private router: Router, 
    private orderentryService: OrderentryService,
    private serviceChoiceService: ServiceChoiceService,
    private customerService: CustomerService,
    private visaServiceService: VisaServiceService,
    private paymentModeService: PaymentModeService,
    private supplierService: SupplierService,
  ) {
    this.getServiceChoices();
    this.getCustomer();
    this.getVisa();
    this.getPayment();
    this.getSupplier();
  }

  async getServiceChoices() {
    const response = await this.serviceChoiceService.listsServiceChoices("0");

    this.supplierModeOfService = response.data.data.map((item:serviceChoicesCommonInterface) =>({
      "id": item.id,
      "serviceChoices": item.serviceChoices,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    this.supplierModeOfServiceSelected = this.supplierModeOfService[0].id
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
    console.log(this.customerList)
    var customerId = localStorage.getItem("customerId");
    this.customerSelected = customerId;
  }


  async getSupplier() {
    const response = await this.supplierService.listsSupplier("0");
    console.log(response.data);

    this.supplierList = response.data.data.map((item:supplierCommonInterface) =>({
      "id": item.id,
      "nameOfSupplier": item.nameOfSupplier,
      "gstNo": item.gstNo,
      "contact": item.contact,
      "email": item.email,
      "address": item.address,
      "supplierModeOfService": item.supplierModeOfService,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    console.log(this.supplierList)
    this.supplierFilterList = this.supplierList
    var supplierId = localStorage.getItem("supplierId");
    this.supplierSelected = supplierId;
  }

  async getVisa() {
    const response = await this.visaServiceService.listsVisaChoices("0");
    console.log(response.data);

    this.visaList = response.data.data.map((item:visaChoicesCommonInterface) =>({
      "id": item.id,
      "visaChoices": item.visaChoices,
      "hideStatus": item.hideStatus,
      "createdAt": item.createdAt,
      "updatedAt": item.updatedAt,
    }));
    this.visaSelected = this.visaList[0].id;
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
    this.paymentSelected = this.paymentList[0].id;
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      destination: ['', Validators.required],
      route: ['', Validators.required],
      dateOfTravel: ['', Validators.required],
      pricePerPax: ['', Validators.required],
      noOfPax: ['', Validators.required],
      totalOrderValue: [{ value: '', disabled: true }],
      customerEstimatedFirstPaymentDate: ['', Validators.required],
      customerEstimatedFirstPayment: ['', Validators.required],
      customerEstimatedSecondPaymentDate: ['', Validators.required],
      customerEstimatedSecondPayment: ['', Validators.required],
      customerEstimatedThirdPaymentDate: ['', Validators.required],
      customerEstimatedThirdPayment: ['', Validators.required],
      bookingReferenceNumber: ['', Validators.required],
      supplierEstimatedFirstPaymentDate: ['', Validators.required],
      supplierEstimatedFirstPayment: ['', Validators.required],
      supplierEstimatedSecondPaymentDate: ['', Validators.required],
      supplierEstimatedSecondPayment: ['', Validators.required],
      supplierEstimatedThirdPaymentDate: ['', Validators.required],
      supplierEstimatedThirdPayment: ['', Validators.required],
    });

    this.form.valueChanges.subscribe(values => {
      const pricePerPax = parseFloat(values.pricePerPax) || 0;
      const noOfPax = parseInt(values.noOfPax, 10) || 0;
      const totalOrderValue = pricePerPax * noOfPax;
      this.form.get('totalOrderValue')?.setValue(totalOrderValue.toFixed(2), { emitEvent: false });
    });
  }

  
  onModeChange() {
    console.log(this.supplierModeOfServiceSelected)
    this.supplierFilterList = []
    for (let item of this.supplierList) {
      if (item.supplierModeOfService == this.supplierModeOfServiceSelected) {
        this.supplierFilterList.push({
          "id": item.id,
          "nameOfSupplier": item.nameOfSupplier,
          "gstNo": item.gstNo,
          "contact": item.contact,
          "email": item.email,
          "address": item.address,
          "supplierModeOfService": item.supplierModeOfService,
          "hideStatus": item.hideStatus,
          "createdAt": item.createdAt,
          "updatedAt": item.updatedAt,
        });
      }
    }
  }

  private calculateCustomerAmountToBePaid() {
    const firstPayment = this.form.get('customerEstimatedFirstPayment')?.value || 0;
    const secondPayment = this.form.get('customerEstimatedSecondPayment')?.value || 0;
    const thirdPayment = this.form.get('customerEstimatedThirdPayment')?.value || 0;

    return Number(firstPayment) + Number(secondPayment) + Number(thirdPayment);
  }

  private calculateSupplierAmountToBePaid() {
    const firstPayment = this.form.get('supplierEstimatedFirstPayment')?.value || 0;
    const secondPayment = this.form.get('supplierEstimatedSecondPayment')?.value || 0;
    const thirdPayment = this.form.get('supplierEstimatedThirdPayment')?.value || 0;

    return Number(firstPayment) + Number(secondPayment) + Number(thirdPayment);
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log("working");
    this.submitted = true;
    var datePipe = new DatePipe("en-US");

    var orderJson = {
      "customerOrderName": this.customerSelected,
      "orderPaymentMode": this.paymentSelected,
      "destination": this.f['destination'].value,
      "route": this.f['route'].value,
      "orderServicesRequired": this.supplierModeOfServiceSelected,
      "orderVisaService": this.visaSelected,
      "dateOfTravel": datePipe.transform(this.f['dateOfTravel'].value, 'yyyy-MM-dd'),
      "pricePerPax": this.f['pricePerPax'].value,
      "noOfPax": this.f['noOfPax'].value,
      "totalOrderValue": this.f['totalOrderValue'].value,
    }

    var paymentCollectionJson = {
      "customerPaymentId": this.customerSelected,
      "customerEstimatedFirstPaymentDate": datePipe.transform(this.f['customerEstimatedFirstPaymentDate'].value, 'yyyy-MM-dd'),
      "customerEstimatedFirstPayment": this.f['customerEstimatedFirstPayment'].value,
      "customerEstimatedSecondPaymentDate": datePipe.transform(this.f['customerEstimatedSecondPaymentDate'].value, 'yyyy-MM-dd'),
      "customerEstimatedSecondPayment": this.f['customerEstimatedSecondPayment'].value,
      "customerEstimatedThirdPaymentDate": datePipe.transform(this.f['customerEstimatedThirdPaymentDate'].value, 'yyyy-MM-dd'),
      "customerEstimatedThirdPayment": this.f['customerEstimatedThirdPayment'].value,
      "customerAmountToBePaid": this.calculateCustomerAmountToBePaid()
    }

    var paymentSupplierJson = {
      "paymentSupplier": this.supplierSelected,
      "bookingReferenceNumber": this.f['bookingReferenceNumber'].value,
      "supplierEstimatedFirstPaymentDate": datePipe.transform(this.f['supplierEstimatedFirstPaymentDate'].value, 'yyyy-MM-dd'),
      "supplierEstimatedFirstPayment": this.f['supplierEstimatedFirstPayment'].value,
      "supplierEstimatedSecondPaymentDate": datePipe.transform(this.f['supplierEstimatedSecondPaymentDate'].value, 'yyyy-MM-dd'),
      "supplierEstimatedSecondPayment": this.f['supplierEstimatedSecondPayment'].value,
      "supplierEstimatedThirdPaymentDate": datePipe.transform(this.f['supplierEstimatedThirdPaymentDate'].value, 'yyyy-MM-dd'),
      "supplierEstimatedThirdPayment": this.f['supplierEstimatedThirdPayment'].value,
      "supplierAmountToBePaid": this.calculateSupplierAmountToBePaid()
    }

    var completeJson = {
      "orderJson": orderJson,
      "paymentCollectionJson": paymentCollectionJson,
      "paymentSupplierJson": paymentSupplierJson,
    }

    console.log(completeJson)
    var id = "0";
    this.orderentryService
      .processOrderentry(completeJson, id)
      .then(response => {
        if (response.data['code'] == 1) {
          // Success
          localStorage.setItem('orderId', response.data['orderId']);
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
