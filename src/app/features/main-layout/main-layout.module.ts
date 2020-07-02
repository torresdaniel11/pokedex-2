import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutComponent } from './components/layout/layout.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MainLayoutRoutingModule
  ]
})
export class MainLayoutModule { }
