import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CreateSaucerModalComponent } from './create-saucer-modal/create-saucer-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateSaucerModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    CreateSaucerModalComponent
  ]
})
export class ComponentsModule { }
