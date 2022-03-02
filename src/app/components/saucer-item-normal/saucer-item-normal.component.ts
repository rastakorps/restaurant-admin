import { Component, OnInit, Input } from '@angular/core';
import { Saucer } from '../../interfaces';
import { ModalController } from '@ionic/angular';
import { SaucerDetailComponent } from '../saucer-detail/saucer-detail.component';

@Component({
  selector: 'app-saucer-item-normal',
  templateUrl: './saucer-item-normal.component.html',
  styleUrls: ['./saucer-item-normal.component.scss'],
})
export class SaucerItemNormalComponent implements OnInit {

  @Input() saucer: Saucer;
  modalDataResponse: any;

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
        console.log(modalDataResponse)
        //this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }

}
