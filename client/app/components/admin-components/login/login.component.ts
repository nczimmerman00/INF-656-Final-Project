import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router, 
    private fb: FormBuilder) { 
        this.loginForm = this.fb.group({
          username:'',
          password:''
        });
    }

  ngOnInit(): void {
  }

  attemptLogin(): void {
    let username = this.loginForm.get('username').value;
    let password = this.loginForm.get('password').value;
    this.authenticationService.login(username, password).subscribe(() => this.router.navigateByUrl("/admin"));
  }
}