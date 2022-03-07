import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SingleOrder } from '../../interfaces/index';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
})
export class OrderItemComponent implements OnInit {

  @Input() order: SingleOrder;
  @Output() deleteOrder = new EventEmitter();
  @Output() showOrder = new EventEmitter();
  @Output() editOrder = new EventEmitter();

  constructor(public alertController: AlertController) { }

  ngOnInit() {}

  openSliding(slidingItem) {
    slidingItem.open();
  }

  async presentAlertConfirm(orderId: Number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar orden',
      message: '¿Estás seguro de eliminar la orden?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si',
          id: 'confirm-button',
          handler: () => {
            this.deleteOrder.emit(orderId);
          }
        }
      ]
    });

    await alert.present();
  }

  onShowOrder(orderId: Number) {
    this.showOrder.emit(orderId);
  }

  onEditOrder(orderId: Number) {
    this.editOrder.emit(orderId);
  }
}
