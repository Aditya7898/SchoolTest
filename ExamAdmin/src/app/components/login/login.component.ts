import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AdminService } from '../../services/admin.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRespError: any;

  constructor(private adminService: AdminService, private router: Router,
    private tokenService: TokenService, private fb: FormBuilder) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  Login() {
    this.loginRespError = false;
    this.adminService.Login(this.loginForm.value).subscribe(res => {
      this.loginForm.reset();
      this.tokenService.setToken(res.token);
      this.router.navigate(['/common/dashboard']);
    }, err => {
      console.log(err)
      if (err.error.message) {
        this.loginRespError = err.error.message;
      }
      if (err.error.msg) {
        this.loginRespError = err.error.msg[0].message;
      }
      console.log(this.loginRespError)
    });
  }

}
