import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  authForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.authForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(6), Validators.email],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  signinEmail(): void {
    const values = this.authForm.value;
    this.auth
      .emailSignIn(values.email, values.password)
      .then((ok) => {
        this.router.navigate(['app', 'pokedex']);
      })
      .catch((err) => {
        // TODO hangle error with love
        console.log(err);
        alert(err);
      });
  }

  handleError(error) {
    console.log(error);
  }

  loginSuccessful() {
    this.router.navigate(['app/pokedex']);
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }
}
