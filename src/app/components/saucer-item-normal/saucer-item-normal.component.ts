import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Saucer } from '../../interfaces';
import { ModalController } from '@ionic/angular';
import { SaucerDetailComponent } from '../saucer-detail/saucer-detail.component';
import { OrderSaucer } from '../../interfaces/index';

@Component({
  selector: 'app-saucer-item-normal',
  templateUrl: './saucer-item-normal.component.html',
  styleUrls: ['./saucer-item-normal.component.scss'],
})
export class SaucerItemNormalComponent implements OnInit {

  @Input() saucer: Saucer;
  @Input() saucersToEdit: OrderSaucer[];
  @Output() saucerSelected = new EventEmitter();
  modalDataResponse: any;
  public orderSaucer: OrderSaucer;
  public dynamicColor: string = null;
  public saucerQuantity: number = 0;

  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {
    if(this.saucersToEdit.length > 0) {
      if(this.saucersToEdit.some(item => item.id == this.saucer.id)) {
        this.dynamicColor = 'success';
        const found = this.saucersToEdit.find(element => element.id == this.saucer.id);        
        this.saucerQuantity = found.pivot.quantity;
      }
    }
  }

  async openSaucerDetailModal(saucer: Saucer) {    
    const modal = await this.modalCtrl.create({
      component: SaucerDetailComponent,
      componentProps: {
        'saucer': saucer,
        'saucerQuantity': this.saucerQuantity
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse.data !== undefined) {
        this.orderSaucer = {
          id: modalDataResponse.data.id,
          quantity: modalDataResponse.data.quantity
        }
        
        this.saucerQuantity = this.orderSaucer.quantity;

        if(this.orderSaucer.quantity == 0) {
          this.dynamicColor = null;
          //const isLargeNumber = (element) => element.id == this.orderSaucer.id;
          //const toDelete = this.saucersToEdit.findIndex(isLargeNumber);
          //this.saucersToEdit.splice(toDelete, 1);
          //console.log(this.saucersToEdit);
          
        } else this.dynamicColor = 'success';

        
        this.saucerSelected.emit(this.orderSaucer);
        //this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }

  updateSaucersGiven(saucers: OrderSaucer[]) {
    console.log('desde hijo');
    console.log(this.saucersToEdit);
    //this.saucerQuantity = 
  }

}
