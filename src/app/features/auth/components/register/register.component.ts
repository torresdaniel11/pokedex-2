import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { countCapitalsValidator } from '@validators/count-capitals.validator';
import { countNumbersValidator } from '@validators/count-numbers.validator';
import { LocalstorageService } from '@services/localstorage.service';
import { matchValuesValidator } from '@validators/match-values.validatios';
import { REGISTER_CONSTANTS } from '../../auth.constants';
import { specialCharactersValidator } from '@validators/special-caracter.validator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  contstants: any;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private storage: LocalstorageService
  ) {
    this.contstants = REGISTER_CONSTANTS;
  }

  ngOnInit() {
    this.createForm();
  }

  /**
   * navigate back to user sign in
   *
   */
  cancel() {
    this.router.navigate(['auth']);
  }

  /**
   * submit action for register user
   *
   */
  submitRegister() {
    const values = this.registerForm.value;


    this.storeInfo(values);
    this.auth.emailCreateUser(values.email, values.password).then(ok => {
      this.router.navigate(['app', 'pokedex']);
    }).catch(error => {
      swal.fire({
        title: 'Oh, lo sentimos',
        text: error.message,
        icon: 'error',
        showConfirmButton: true
      });
    });
  }

  /**
   * store user info in local storage
   *
   * @param {*} userInfo
   */
  storeInfo(userInfo): void {
    this.storage.storeUser(JSON.stringify(userInfo));
  }

  /**
   * create register form
   *
   */
  createForm() {
    this.registerForm = this.fb.group(
      {
        names: ['',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ],
        email: ['',
          [
            Validators.required,
            Validators.email,
            Validators.minLength(5),
          ]
        ],
        password: ['',
          [
            Validators.required,
            Validators.minLength(8),
            specialCharactersValidator(REGISTER_CONSTANTS.PASSWORD.REQUIRED_SPECIAL_CARACTERS),
            countCapitalsValidator(REGISTER_CONSTANTS.PASSWORD.REQUIRED_CAPITALS),
            countNumbersValidator(REGISTER_CONSTANTS.PASSWORD.REQUIRED_NUMBERS),
          ]
        ],
        confirmPassword: ['',
          [
            Validators.required,
            Validators.minLength(8),
            matchValuesValidator('password')
          ]
        ]
      }, { validator: this.checkPasswords }
    );
  }

  /**
   * confirm if passwords coincide
   *
   * @param {FormGroup} group
   * @returns
   */
  checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get names() {
    return this.registerForm.get('names');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }
}
