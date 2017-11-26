import { EventEmitter, Injectable } from '@angular/core';
import { ItemBasket } from '../models/item-basket';

@Injectable()
export class BasketProvider {
  basket: ItemBasket[] = [];
  updatedBasket = new EventEmitter<ItemBasket[]>();

  constructor() {}

  updateBasket(action: string, itemBasket: ItemBasket) {
    switch (action) {
      case '[BASKET] ADD_ITEM':
        let found = false;
        for (const i in this.basket) {
          if (this.basket[i].item.name === itemBasket.item.name) {
            this.basket[i].quantity += itemBasket.quantity;
            found = true;
            break;
          }
        }

        if (!found) {
          this.basket.push(itemBasket);
        }

        this.updatedBasket.emit(this.basket);
        break;

      case '[BASKET] UPDATE_ITEM':
        for (const i in this.basket) {
          if (this.basket[i].item.name === itemBasket.item.name) {
            this.basket[i] = itemBasket;

            this.updatedBasket.emit(this.basket);
            break;
          }
        }
        break;

      case '[BASKET] DELETE_ITEM':
        for (const i in this.basket) {
          if (this.basket[i].item.name === itemBasket.item.name) {
            this.basket.splice(+i, 1);

            this.updatedBasket.emit(this.basket);
            break;
          }
        }
        break;
    }
  }
}
