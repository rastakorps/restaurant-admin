import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CreateOrderModalComponent } from '../../components/create-order-modal/create-order-modal.component';
import { Saucer } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  modalDataResponse: any;

  constructor(
    public alertController: AlertController,
    public modalCtrl: ModalController,
  ) {}

  async createNewOrder() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo pedido',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre del pedido'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (alertData) => {    
            let data: Saucer;
            data = {
              name: alertData.name,
              description: alertData.description,
              status: true
            }   
          }
        }
      ]
    });

    await alert.present();
  }

  async openCreateModal(saucer: Saucer) {
    const modal = await this.modalCtrl.create({
      component: CreateOrderModalComponent,
      componentProps: {
        'saucer': saucer
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }
}
