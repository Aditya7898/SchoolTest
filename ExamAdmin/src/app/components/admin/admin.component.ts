import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  registerForm: FormGroup;
  toggle1 = false;
  toggle2 = false;
  toggle3 = false;

  constructor(private fb: FormBuilder, private adminService: AdminService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  OnSubmit() {
    console.log(this.registerForm.value);
    this.adminService.CreateAdmin(this.registerForm.value).subscribe(result => {
      console.log(result);
    }, err => {
      console.log(err);
    });
  }


  toggle(toggle) {
    console.log('Called toggle');
    if (toggle === 'toggle1') {
      this.toggle1 = !this.toggle1;
      console.log('Called toggle1');
    }
    else if (toggle === 'toggle2') {
      this.toggle2 = !this.toggle2;
      console.log('Called toggle2');
    }
    else if (toggle === 'toggle3') {
      this.toggle3 = !this.toggle3;
      console.log('Called toggle3');
    } else {
      console.log(toggle);
    }
  }

}
