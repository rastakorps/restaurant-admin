import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { RestaurantRestService } from '../../services/restaurant-rest.service';
import { Saucer } from '../../interfaces/index';

@Component({
  selector: 'app-create-saucer-modal',
  templateUrl: './create-saucer-modal.component.html',
  styleUrls: ['./create-saucer-modal.component.scss'],
})
export class CreateSaucerModalComponent implements OnInit {

  name:string;
  description:string;
  price: number;

  constructor(
    private modalCtr: ModalController,
    private restaurantRestService: RestaurantRestService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    ) { }

  ngOnInit() {}

  async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

  createSaucer() {
    const loading = this.presentLoading();
    const message = "Se ha creado el platillo";
    const promise = new Promise((resolve, reject) => {
        let data: Saucer;
              data = {
                name: this.name,
                description: this.description,
                price: this.price
              } 
        console.log(data) 
        this.restaurantRestService.addSaucer(data)
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
}
