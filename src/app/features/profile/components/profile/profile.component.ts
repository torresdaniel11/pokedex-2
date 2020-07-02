import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { LocalstorageService } from '@services/localstorage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  info: any;

  constructor(
    private fb: FormBuilder,
    private storage: LocalstorageService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUserInfo();
    this.createForm();
  }

  /**
   * retrieve user info from localstorage
   *
   */
  getUserInfo() {
    const storedInfo = this.storage.getUserInfo();

    if (!storedInfo) {
      swal.fire({
        title: 'Oh, lo sentimos',
        text: 'No encontramos la información en este momento',
        icon: 'error',
        showConfirmButton: true,
      });
    } else {
      this.info = JSON.parse(storedInfo);
    }
  }

  /**
   * navigate back to user sign in
   *
   */
  cancel() {
    this.location.back();
  }

  /**
   * submit action for register user
   *
   */
  submitRegister() {
    const values = this.profileForm.value;

    this.storeInfo(values);
    swal.fire({
      title: 'Genial!',
      text: 'Guardamos tu información',
      icon: 'success',
      showConfirmButton: true,
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
   * create profile form
   *
   */
  createForm() {
    const namesValue = this.info ? this.info.names : '';
    const emailValue = this.info ? this.info.email : '';

    this.profileForm = this.fb.group({
      names: [
        namesValue,
        [Validators.required, Validators.minLength(6)]],
      email: [
        emailValue,
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
  }

  get names() {
    return this.profileForm.get('names');
  }

  get email() {
    return this.profileForm.get('email');
  }
}
