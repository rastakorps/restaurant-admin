import { Component, Input, OnInit } from '@angular/core';
import { ModalController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { RestaurantRestService } from '../../services/restaurant-rest.service';
import { Order } from '../../interfaces/index';
import { DomSanitizer } from '@angular/platform-browser';

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
  public imageDefault: string = "data:image/png;base64,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";

  constructor(
    public modalCtr: ModalController,
    public loadingController: LoadingController,
    public domSanitizationService: DomSanitizer,
    private restaurantRestService: RestaurantRestService,
    public alertController: AlertController,
    public toastController: ToastController
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

  async returnPage() {
    console.log('este');
    
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  async close() {
    const closeModal: any = {reloadOrders: true};
    await this.modalCtr.dismiss(closeModal);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    return await loading.present();
  }

  async presentAlertConfirm(orderId: Number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Finalizar orden',
      message: '¿Estás seguro de finalizar esta orden?',
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
            this.finishOrder(orderId);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  finishOrder(orderId:Number) {
    const loading = this.presentLoading();
    const message = "Orden terminada!!!";
    this.restaurantRestService.finishOrder(orderId)
      .subscribe(() => {
        this.presentToast(message); 
        this.close();
        },
        (error) => {
          loading.then(() => { this.loadingController.dismiss();});
        },
        () => {
          loading.then(() => { this.loadingController.dismiss();});
        }
      )
  }

}
