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
  @Output() saucerSelected = new EventEmitter();
  modalDataResponse: any;
  public orderSaucer: OrderSaucer;

  constructor(
    public modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  async openSaucerDetailModal(saucer: Saucer) {    
    const modal = await this.modalCtrl.create({
      component: SaucerDetailComponent,
      componentProps: {
        'saucer': saucer
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse.data !== undefined) {
        this.orderSaucer = {
          id: modalDataResponse.data.id,
          quantity: modalDataResponse.data.quantity
        }
        this.saucerSelected.emit(this.orderSaucer);
        //this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }

}
