import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Saucer, Order, OrderSaucer } from '../../interfaces';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { RestaurantRestService } from '../../services/restaurant-rest.service';
import { SaucerItemNormalComponent } from '../saucer-item-normal/saucer-item-normal.component';

@Component({
  selector: 'app-edit-order-modal',
  templateUrl: './edit-order-modal.component.html',
  styleUrls: ['./edit-order-modal.component.scss'],
})
export class EditOrderModalComponent implements OnInit {

  @Input() orderId: Number;
  @ViewChild(SaucerItemNormalComponent) hijo: SaucerItemNormalComponent;
  public wasAdded: Boolean;
  public saucers: Saucer[] = [];
  public saucersToEdit: OrderSaucer[];
  public order: Order = {
    id: null,
    name: "",
    total: 0,
    status: null,
    saucers: []    
  };

  constructor(
    private modalCtr: ModalController,
    private restaurantRestService: RestaurantRestService,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) { }

  ngOnInit() {
    this.getOrder();
  }

  getOrder() {
    const loading = this.presentLoading();
    this.restaurantRestService.getOrder(this.orderId)
      .subscribe((order) => {        
        this.order = order;
        console.log(this.order);
        
        this.saucersToEdit = this.order.saucers;            
        this.getSaucers();
        }
      )
  }

  getSaucers() {
    this.restaurantRestService.getSaucers()
      .subscribe( (data:any) => {
        this.saucers.push(...data.saucers);
        this.loadingController.dismiss();        
      });
  }

  async returnPage() {
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

  findSaucer(id) {
    return this.order.saucers.find(element => element.id == id);
  }

  updateSaucerToOrder(orderSaucer: OrderSaucer) {
    if(this.order.saucers.some(item => item.id == orderSaucer.id)) {
      this.order.saucers.forEach((saucer) => {
        if(saucer.id == orderSaucer.id){
          saucer.pivot.quantity = orderSaucer.quantity;
        }
      });
      //this.hijo.updateSaucersGiven(this.saucersToEdit);
      this.saucersToEdit = this.order.saucers;
      
      
      /*if(orderSaucer.quantity == 0){
        console.log('si entramos');
        
        const isLargeNumber = (element) => element.id == orderSaucer.id;
        const toDelete = this.order.saucers.findIndex(isLargeNumber);
        this.order.saucers.splice(toDelete, 1);
        this.saucersToEdit = this.order.saucers; 
        console.log(this.saucersToEdit);
        
      } else {
        console.log('no  se va eliminar nada');
        console.log(orderSaucer);
      }*/
      
      /*arr.splice(2,2);
      this.dynamicColor = 'success';
      const found = this.saucersToEdit.find(element => element.id == this.saucer.id);
      console.log(found);
      
      this.saucerQuantity = found.pivot.quantity;*/
    } else{
      this.order.saucers.push(orderSaucer);
    }
    //this.order.saucers.push(orderSaucer);
  }

  updateOrder() {
    console.log(this.order);
    
    const loading = this.presentLoading();
    const message = "Se ha actualizado la orden";
    const promise = new Promise((resolve, reject) => {
        this.restaurantRestService.updateOrder(this.orderId, this.order)
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
