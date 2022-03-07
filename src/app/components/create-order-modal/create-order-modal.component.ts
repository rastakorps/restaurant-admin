import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { Saucer, OrderSaucer, Order } from '../../interfaces';
import { RestaurantRestService } from '../../services/restaurant-rest.service';

@Component({
  selector: 'app-create-order-modal',
  templateUrl: './create-order-modal.component.html',
  styleUrls: ['./create-order-modal.component.scss'],
})
export class CreateOrderModalComponent implements OnInit {

  @Input() orderName: string;
  public wasAdded: Boolean = false;
  public saucers: Saucer[] = [];
  public order: Order = {
    name: '',
    saucers: []
  };

  constructor(
    private modalCtr: ModalController,
    private restaurantRestService: RestaurantRestService,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.order.name = this.orderName;
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

  addSaucerToOrder(orderSaucer: OrderSaucer) {
    if(this.order.saucers.some(item => item.id == orderSaucer.id)) {
      this.order.saucers.forEach((saucer) => {
        if(saucer.id == orderSaucer.id){
          saucer.quantity = orderSaucer.quantity;
        }
      });
      console.log('after added');
      console.log(this.order);
    } else{
      this.order.saucers.push(orderSaucer);
    }
  }

  createOrder() {
    const loading = this.presentLoading();
    const message = "Se ha creado la orden";
    const promise = new Promise((resolve, reject) => {
        this.restaurantRestService.addOrder(this.order)
                  .subscribe((response) => {
                    loading.then(() => { this.loadingController.dismiss();});
                    this.presentToast(message);
                    this.close();
                  },
                  (error) => {
                    loading.then(() => { this.loadingController.dismiss(); });
                  }); 
    });
    return promise;
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
