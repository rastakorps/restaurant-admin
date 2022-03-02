import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Saucer, OrderSaucer } from '../../interfaces/index';

@Component({
  selector: 'app-saucer-detail',
  templateUrl: './saucer-detail.component.html',
  styleUrls: ['./saucer-detail.component.scss'],
})
export class SaucerDetailComponent implements OnInit {

  @Input() saucer: Saucer;
  private quantity: number = 0;
  public total: number = 0;

  constructor(private modalCtr: ModalController) { }

  ngOnInit() {}

  async close() {
    await this.modalCtr.dismiss();
  }

  public increment () {
    this.quantity++;
    this.total += parseFloat(this.saucer.price.toString());
  }
  
  public decrement () {
    if((this.quantity - 1) < 0){
      this.quantity = 0;
    } else {
      this.quantity--;
      this.total-= parseFloat(this.saucer.price.toString());
    }
  }

  public async addSaucer() {    
    let orderSaucer: OrderSaucer = {
      id: this.saucer.id,
      quantity: this.quantity
    };
    await this.modalCtr.dismiss(orderSaucer);
  }
}
