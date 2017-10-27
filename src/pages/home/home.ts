import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PizzaProvider } from "../../providers/pizza/pizza";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pizzas: Array<any>;

  constructor(public navCtrl: NavController,
              private pizzaProvider: PizzaProvider) {
    this.pizzaProvider.get().subscribe(
      (res: any) => this.pizzas = res,
      err => console.log(err)
    );
  }

}
