import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { CreateSaucerModalComponent } from '../../components/create-saucer-modal/create-saucer-modal.component';
import { RestaurantRestService } from '../../services/restaurant-rest.service';
import { Saucer } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public saucers: Saucer[] = [];
  modalDataResponse: any;

  constructor(
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    private restaurantRestService: RestaurantRestService
  ) {}

  ngOnInit(){
    const loading = this.presentLoading();
    this.restaurantRestService.getSaucers()
      .subscribe( (data:any) => {
        this.saucers.push(...data.saucers);
        this.loadingController.dismiss();
        
      });
  }

  async openNewSaucerModal() {
    const modal = await this.modalCtrl.create({
      component: CreateSaucerModalComponent,
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
        this.restaurantRestService.getSaucers()
          .subscribe( (data:any) => {
            this.saucers = [];
            this.saucers.push(...data.saucers);

          });
        this.modalDataResponse = modalDataResponse.data;
      }
    });

    return await modal.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return await loading.present();
  }
}
