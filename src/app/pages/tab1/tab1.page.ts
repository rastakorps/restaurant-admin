import { Component } from '@angular/core';
import { AlertController, ModalController, LoadingController, ToastController } from '@ionic/angular';
import { CreateOrderModalComponent } from '../../components/create-order-modal/create-order-modal.component';
import { RestaurantRestService } from '../../services/restaurant-rest.service';
import { SingleOrder } from '../../interfaces/index';
import { ShowOrderComponent } from '../../components/show-order/show-order.component';
import { EditOrderModalComponent } from '../../components/edit-order-modal/edit-order-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public orders: SingleOrder[] = [];
  modalDataResponse: any;
  orderName: string;

  constructor(
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private restaurantRestService: RestaurantRestService
  ) {}

  ngOnInit() {
    const loading = this.presentLoading();
    this.restaurantRestService.getOrders()
      .subscribe( (data:any) => {
        this.orders.push(...data.orders);
        this.loadingController.dismiss();        
      });
  }

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
            this.orderName = alertData.name;  
            this.openNewOrderModal();
          }
        }
      ]
    });

    await alert.present();
  }

  async openNewOrderModal() {
    const modal = await this.modalCtrl.create({
      component: CreateOrderModalComponent,
      componentProps: {
        'orderName': this.orderName
      }
    });

    modal.onDidDismiss().then((modalDataResponse) => {
      if (modalDataResponse !== null) {
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

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  removeOrder(orderId:Number) {
    const loading = this.presentLoading();
    const message = "Se ha eliminado la orden!!!";
    this.restaurantRestService.deleteOrder(orderId)
      .subscribe(() => {
        this.restaurantRestService.getOrders()
          .subscribe((data:any) => {
            this.orders = [];
            this.orders.push(...data.orders);
            this.presentToast(message);             
          },
          (error) => {
            loading.then(() => { this.loadingController.dismiss();});
          },
          () => {
            loading.then(() => { this.loadingController.dismiss();});
          });
        }
      )
  }

  async openShowOrder(orderId: Number) {
    const modal = await this.modalCtrl.create({
      component: ShowOrderComponent,
      componentProps: {
        'orderId': orderId
      }
    });

    return await modal.present();
  }

  async openEditOrder(orderId: Number) {
    const modal = await this.modalCtrl.create({
      component: EditOrderModalComponent,
      componentProps: {
        'orderId': orderId
      }
    });

    return await modal.present();
  }
}
