import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import { ContactpersonService } from '../../common-service/contactperson/contactperson.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-process-contactperson',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass,
    FormsModule,
  ],
  templateUrl: './process-contactperson.component.html',
  styleUrl: './process-contactperson.component.css'
})
export class ProcessContactpersonComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  index: number = 0

  constructor(private formBuilder:FormBuilder, 
    private router: Router, 
    private contactpersonService: ContactpersonService,
  ) {
    //
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contactPersons: this.formBuilder.array([
        this.createContact()
      ])
    });
  }

  createContact(): FormGroup {
    return this.formBuilder.group({
      contactPerson: ['', Validators.required],
      designation: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get contactPersons() {
    return this.form.get('contactPersons') as FormArray;
  }

  addContact(): void {
    this.index += 1;
    this.contactPersons.push(this.createContact());
  }

  removeContact(index: number): void {
    if (index != 0) {
      this.index -= 1;
      this.contactPersons.removeAt(index);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    console.log("working");
    this.submitted = true;

    console.log(this.form.value['contactPersons']);
    
    var id = localStorage.getItem('customerId');
    this.contactpersonService
      .processContactPerson(this.form.value['contactPersons'], id)
      .then(response => {
        if (response.data['code'] == 1) {
          // Success
          // c;
          var customerId = localStorage.getItem('customerId');
          swal("Added!", response.data['message'], "success").then(value => {
            // window.history.back();
            this.router.navigateByUrl('/orderentry');
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