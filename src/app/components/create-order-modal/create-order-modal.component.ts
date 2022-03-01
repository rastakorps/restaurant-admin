import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Saucer } from '../../interfaces/index';
import { RestaurantRestService } from '../../services/restaurant-rest.service';

@Component({
  selector: 'app-create-order-modal',
  templateUrl: './create-order-modal.component.html',
  styleUrls: ['./create-order-modal.component.scss'],
})
export class CreateOrderModalComponent implements OnInit {

  @Input() orderName: string;
  public saucers: Saucer[] = [];

  constructor(
    private modalCtr: ModalController,
    public loadingController: LoadingController,
    private restaurantRestService: RestaurantRestService
  ) { }

  ngOnInit() {
    const loading = this.presentLoading();
    this.restaurantRestService.getSaucers()
      .subscribe( (data:any) => {
        this.saucers.push(...data.saucers);
        this.loadingController.dismiss();        
      });
  }

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return await loading.present();
  }

}
