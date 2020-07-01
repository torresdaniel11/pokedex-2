import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [InfiniteScrollDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [InfiniteScrollDirective, FormsModule, ReactiveFormsModule],
})
export class SharedModule {}
