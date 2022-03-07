import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Saucer } from '../../interfaces/index';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-saucer-item',
  templateUrl: './saucer-item.component.html',
  styleUrls: ['./saucer-item.component.scss'],
})
export class SaucerItemComponent implements OnInit {

  @Input() saucer: Saucer;
  @Output() deleteSaucer = new EventEmitter();

  constructor(public alertController: AlertController) { }

  ngOnInit() {}

  openSliding(slidingItem) {
    slidingItem.open();
  }

  async presentAlertConfirm(saucerId: Number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Eliminar platillo',
      message: '¿Estás seguro de eliminar el platillo?',
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
            this.deleteSaucer.emit(saucerId);
          }
        }
      ]
    });

    await alert.present();
  }
}
