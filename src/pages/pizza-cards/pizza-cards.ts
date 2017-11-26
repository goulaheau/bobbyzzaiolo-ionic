import { Component, OnDestroy } from '@angular/core';
import { PizzaProvider } from '../../providers/pizza';
import { Pizza } from '../../models/pizza';
import { PizzaDetailPage } from '../pizza-detail/pizza-detail';
import { NavParams, ToastController } from 'ionic-angular';
import { PizzaFormPage } from '../pizza-form/pizza-form';
import { Subscription } from 'rxjs/Subscription';
import { BasketProvider } from '../../providers/basket';

@Component({
  selector   : 'page-pizza-cards',
  templateUrl: 'pizza-cards.html'
})
export class PizzaCardsPage implements OnDestroy {
  pizzas: Pizza[];
  pizzaDetailPage               = PizzaDetailPage;
  pizzaFormPage                 = PizzaFormPage;
  inAdmin: boolean;
  subscriptions: Subscription[] = [];

  constructor(private pizzaProvider: PizzaProvider,
              private navParams: NavParams,
              private toastCtrl: ToastController,
              private basketProvider: BasketProvider) {
    this.subscriptions.push(this.pizzaProvider.getAll().subscribe(
      pizzas => this.pizzas = pizzas
    ));

    this.subscriptions.push(this.pizzaProvider.pizzaCreated$.subscribe(
      res => {
        if (this.pizzas) {
          this.pizzas.push(res);
        }

        this.toastCtrl.create({
          message : `La pizza ${res.name} a été ajoutée à la carte !`,
          duration: 5000,
          position: 'top'
        }).present();
      }
    ));

    this.subscriptions.push(this.pizzaProvider.pizzaUpdated$.subscribe(
      res => {
        if (this.pizzas) {
          for (const i in this.pizzas) {
            if (this.pizzas[i]._id === res._id) {
              this.pizzas[i] = res;
              break;
            }
          }
        }
      }
    ));

    this.subscriptions.push(this.pizzaProvider.pizzaRemoved$.subscribe(
      res => {
        if (this.pizzas) {
          for (const i in this.pizzas) {
            if (this.pizzas[i]._id === res._id) {
              this.pizzas.splice(+i, 1);
              break;
            }
          }
        }
      }
    ));

    this.inAdmin = this.navParams.data.admin ? this.navParams.data.admin : false;
  }

  addItemBasket(pizza: Pizza): void {
    this.basketProvider.updateBasket(
      '[BASKET] ADD_ITEM',
      { item: pizza, quantity: 1 }
    );
  }

  remove(pizza: Pizza): void {
    this.pizzaProvider.delete(pizza._id).subscribe(
      (res) => this.toastCtrl.create({
        message : `La pizza ${res.name} a été supprimée.`,
        duration: 5000,
        position: 'top'
      }).present(),
      () => this.toastCtrl.create({
        message : 'Une erreur s\'est produite lors de la modification de la pizza.',
        duration: 5000,
        position: 'top'
      }).present());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    );
  }
}
