import { Component, OnDestroy } from '@angular/core';
import { IngredientProvider } from '../../providers/ingredient';
import { Ingredient } from '../../models/ingredient';
import { ToastController } from 'ionic-angular';
import { IngredientFormPage } from '../ingredient-form/ingredient-form';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector   : 'page-ingredient-cards',
  templateUrl: 'ingredient-cards.html'
})
export class IngredientCardsPage implements OnDestroy {
  ingredients: Ingredient[];
  ingredientFormPage               = IngredientFormPage;
  subscribers: Subscription[] = [];

  constructor(private ingredientProvider: IngredientProvider,
              private toastCtrl: ToastController) {
    this.subscribers.push(this.ingredientProvider.getAll().subscribe(
      ingredients => this.ingredients = ingredients
    ));

    this.subscribers.push(this.ingredientProvider.ingredientCreated$.subscribe(
      res => {
        if (this.ingredients) {
          this.ingredients.push(res);
        }
      }
    ));

    this.subscribers.push(this.ingredientProvider.ingredientUpdated$.subscribe(
      res => {
        if (this.ingredients) {
          for (const i in this.ingredients) {
            if (this.ingredients[i]._id === res._id) {
              this.ingredients[i] = res;
              break;
            }
          }
        }
      }
    ));

    this.subscribers.push(this.ingredientProvider.ingredientRemoved$.subscribe(
      res => {
        if (this.ingredients) {
          for (const i in this.ingredients) {
            if (this.ingredients[i]._id === res._id) {
              this.ingredients.splice(+i, 1);
              break;
            }
          }
        }
      }
    ));
  }

  remove(ingredient: Ingredient): void {
    this.ingredientProvider.delete(ingredient._id).subscribe(
      (res) => this.toastCtrl.create({
        message : `L'ingredient ${res.name} a été supprimé.`,
        duration: 5000,
        position: 'top'
      }).present(),
      () => this.toastCtrl.create({
        message : 'Une erreur s\'est produite lors de la modification de la ingredient.',
        duration: 5000,
        position: 'top'
      }).present());
  }

  ngOnDestroy(): void {
    for (const i in this.subscribers) {
      this.subscribers[i].unsubscribe();
    }
  }
}
