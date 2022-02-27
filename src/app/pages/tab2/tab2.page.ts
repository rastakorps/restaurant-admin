import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CreateSaucerModalComponent } from '../../components/create-saucer-modal/create-saucer-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  modalDataResponse: any;

  constructor(public modalCtrl: ModalController,) {}

  async createNewSaucer() {
    const modal = await this.modalCtrl.create({
      component: CreateSaucerModalComponent,
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }

}
