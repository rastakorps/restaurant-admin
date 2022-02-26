import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public alertController: AlertController,
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
            
          }
        }
      ]
    });

    await alert.present();
  }

}
