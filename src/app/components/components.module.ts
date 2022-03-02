import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CreateSaucerModalComponent } from './create-saucer-modal/create-saucer-modal.component';
import { FormsModule } from '@angular/forms';
import { SaucerItemComponent } from './saucer-item/saucer-item.component';
import { SaucerItemNormalComponent } from './saucer-item-normal/saucer-item-normal.component';
import { CreateOrderModalComponent } from './create-order-modal/create-order-modal.component';
import { SaucerDetailComponent } from './saucer-detail/saucer-detail.component';


@NgModule({
  declarations: [
    CreateSaucerModalComponent,
    CreateOrderModalComponent,
    SaucerItemComponent,
    SaucerItemNormalComponent,
    SaucerDetailComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    CreateSaucerModalComponent,
    CreateOrderModalComponent,
    SaucerItemComponent,
    SaucerItemNormalComponent,
    SaucerDetailComponent
  ]
})
export class ComponentsModule { }
