import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from '@shared/shared.module';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [RegisterComponent, SigninComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
