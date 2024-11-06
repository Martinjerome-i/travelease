import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../common-service/report/report.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {CommonModule, NgClass, NgForOf, NgIf} from "@angular/common";
import swal from 'sweetalert';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  constructor(private formBuilder:FormBuilder, 
    private router: Router, 
    private reportService: ReportService,
  ) {
    //
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      gstNo: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      mail: ['', Validators.required],
      address: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log("working");
    this.submitted = true;
    // var userId = localStorage.getItem("userID");

    var data = {
      "name": this.f['name'].value,
      "gstNo": this.f['gstNo'].value,
      "phoneNumber": this.f['phoneNumber'].value,
      "mail": this.f['mail'].value,
      "address": this.f['address'].value,
      "hideStatus": 0,
    }
    var id = "0";
    this.reportService
      .processCustomer(data, id)
      .then(response => {
        if (response.data['code'] == 1) {
          // Success
          localStorage.setItem('customerId', response.data['customerId']);
          var customerId= localStorage.getItem('customerId');
          console.log(customerId);
          swal("Added!", response.data['message'], "success").then(value => {
            // window.history.back();
            this.router.navigateByUrl('/contactperson');
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