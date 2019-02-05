import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-regiser',
  templateUrl: './regiser.component.html',
  styleUrls: ['./regiser.component.css']
})
export class RegiserComponent implements OnInit {
  classes: any[] = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  registerForm: FormGroup;
  errorMsg: any;

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required]],
      enrollment: ['', [Validators.required]],
      class: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  }

  OnSubmit() {
    this.errorMsg = null;
    console.log(this.registerForm.value);
    this.authService.CreateUser(this.registerForm.value).subscribe(user => {
      alert('Student Created Successfully.');
      this.registerForm.reset();
    }, err => {
      if (err.error.msg) {
        this.errorMsg = err.error.msg[0].message;
      }
      if (err.error.message) {
        this.errorMsg = err.error.message;
      }
    });
  }
}
