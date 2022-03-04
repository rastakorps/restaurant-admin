import { Component } from '@angular/core';
import { AlertController, ModalController, LoadingController } from '@ionic/angular';
import { CreateOrderModalComponent } from '../../components/create-order-modal/create-order-modal.component';
import { RestaurantRestService } from '../../services/restaurant-rest.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  modalDataResponse: any;
  orderName: string;

  constructor(
    public alertController: AlertController,
    public modalCtrl: ModalController,
    public loadingController: LoadingController,
    private restaurantRestService: RestaurantRestService
  ) {}

  ngOnInit() {
    /*const loading = this.presentLoading();
    this.restaurantRestService.getOrders()
      .subscribe( (data:any) => {
        this.saucers.push(...data.saucers);
        this.loadingController.dismiss();        
      });*/
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
}
