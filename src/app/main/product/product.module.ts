import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingComponent } from './booking/booking.component';



@NgModule({
  declarations: [ProductComponent,ProductComponent, BookingComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: 'product',
        component: ProductComponent,
      },
      {
        path: 'booking',
        component: BookingComponent,
      },
  ]), 
  ]
})
export class ProductModule { }
