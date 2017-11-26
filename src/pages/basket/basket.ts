import { Component, OnDestroy } from '@angular/core';
import { BasketProvider } from '../../providers/basket';
import { ItemBasket } from '../../models/item-basket';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector   : 'page-basket',
  templateUrl: 'basket.html'
})
export class BasketPage implements OnDestroy {
  basket: ItemBasket[];
  subscriptions: Subscription[] = [];

  constructor(private basketProdiver: BasketProvider) {
    this.basket = this.basketProdiver.basket;

    this.subscriptions.push(this.basketProdiver.updatedBasket.subscribe(
      basket => this.basket = basket
    ));
  }

  getBasketTotal(): number {
    let total = 0;

    this.basket.forEach(
      itemBasket => total += (+itemBasket.item.price * itemBasket.quantity)
    );

    return total;
  }

  onChangeQuantity(quantity: number, itemBasket: ItemBasket): void {
    itemBasket.quantity = quantity;

    if (itemBasket.quantity < 0) {
      itemBasket.quantity = 0;
    }

    this.basketProdiver.updateBasket('[BASKET] UPDATE_ITEM', itemBasket);
  }

  onDeleteItem(itemBasket: ItemBasket): void {
    this.basketProdiver.updateBasket('[BASKET] DELETE_ITEM', itemBasket);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      subscription => subscription.unsubscribe()
    )
  }
}
