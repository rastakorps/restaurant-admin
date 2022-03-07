import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { RestaurantRestService } from '../../services/restaurant-rest.service';
import { Order } from '../../interfaces/index';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.scss'],
})
export class ShowOrderComponent implements OnInit {

  @Input() orderId: Number;
  public order: Order = {
    id: null,
    name: "",
    total: 0,
    status: null,
    saucers: []    
  };

  constructor(
    public modalCtr: ModalController,
    public loadingController: LoadingController,
    private restaurantRestService: RestaurantRestService
  ) { }

  ngOnInit() {
    const loading = this.presentLoading();
    this.restaurantRestService.getOrder(this.orderId)
      .subscribe((order) => {        
        this.order = order;            
        this.loadingController.dismiss();
        }
      )
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
