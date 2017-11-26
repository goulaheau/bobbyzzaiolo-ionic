webpackJsonp([0],{

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PizzaCardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_pizza__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pizza_detail_pizza_detail__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pizza_form_pizza_form__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_basket__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PizzaCardsPage = (function () {
    function PizzaCardsPage(pizzaProvider, navParams, toastCtrl, basketProvider) {
        var _this = this;
        this.pizzaProvider = pizzaProvider;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.basketProvider = basketProvider;
        this.pizzaDetailPage = __WEBPACK_IMPORTED_MODULE_2__pizza_detail_pizza_detail__["a" /* PizzaDetailPage */];
        this.pizzaFormPage = __WEBPACK_IMPORTED_MODULE_4__pizza_form_pizza_form__["a" /* PizzaFormPage */];
        this.subscriptions = [];
        this.subscriptions.push(this.pizzaProvider.getAll().subscribe(function (pizzas) { return _this.pizzas = pizzas; }));
        this.subscriptions.push(this.pizzaProvider.pizzaCreated$.subscribe(function (res) {
            if (_this.pizzas) {
                _this.pizzas.push(res);
            }
            _this.toastCtrl.create({
                message: "La pizza " + res.name + " a \u00E9t\u00E9 ajout\u00E9e \u00E0 la carte !",
                duration: 5000,
                position: 'top'
            }).present();
        }));
        this.subscriptions.push(this.pizzaProvider.pizzaUpdated$.subscribe(function (res) {
            if (_this.pizzas) {
                for (var i in _this.pizzas) {
                    if (_this.pizzas[i]._id === res._id) {
                        _this.pizzas[i] = res;
                        break;
                    }
                }
            }
        }));
        this.subscriptions.push(this.pizzaProvider.pizzaRemoved$.subscribe(function (res) {
            if (_this.pizzas) {
                for (var i in _this.pizzas) {
                    if (_this.pizzas[i]._id === res._id) {
                        _this.pizzas.splice(+i, 1);
                        break;
                    }
                }
            }
        }));
        this.inAdmin = this.navParams.data.admin ? this.navParams.data.admin : false;
    }
    PizzaCardsPage.prototype.addItemBasket = function (pizza) {
        this.basketProvider.updateBasket('[BASKET] ADD_ITEM', { item: pizza, quantity: 1 });
    };
    PizzaCardsPage.prototype.remove = function (pizza) {
        var _this = this;
        this.pizzaProvider.delete(pizza._id).subscribe(function (res) { return _this.toastCtrl.create({
            message: "La pizza " + res.name + " a \u00E9t\u00E9 supprim\u00E9e.",
            duration: 5000,
            position: 'top'
        }).present(); }, function () { return _this.toastCtrl.create({
            message: 'Une erreur s\'est produite lors de la modification de la pizza.',
            duration: 5000,
            position: 'top'
        }).present(); });
    };
    PizzaCardsPage.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    return PizzaCardsPage;
}());
PizzaCardsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-pizza-cards',template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/pizza-cards/pizza-cards.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bobbyzzaiolo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <ng-container *ngIf="!inAdmin">\n          <h1>La carte</h1>\n        </ng-container>\n        <ng-container *ngIf="inAdmin">\n          <h1>\n            Pizzas\n            <ion-icon name="add-circle"\n                      [navPush]="pizzaFormPage"\n                      small>\n            </ion-icon>\n          </h1>\n        </ng-container>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-lg-2 col-md-3 col-sm-6 *ngFor="let pizza of pizzas">\n        <ion-card>\n          <ion-card-header [navPush]="pizzaDetailPage"\n                           [navParams]="pizza">\n            {{pizza.name}} - {{pizza.price}} €\n          </ion-card-header>\n\n          <ion-card-content [navPush]="pizzaDetailPage"\n                            [navParams]="pizza">\n            <img [src]="pizza.image" alt="">\n          </ion-card-content>\n\n          <ion-row>\n            <ion-col *ngIf="!inAdmin">\n              <button ion-button (click)="addItemBasket(pizza)">Ajouter au panier</button>\n            </ion-col>\n            <ion-col *ngIf="inAdmin">\n              <button [navPush]="pizzaFormPage"\n                      [navParams]="pizza"\n                      ion-button icon-left clear small>\n                <ion-icon name="create"></ion-icon>\n              </button>\n            </ion-col>\n            <ion-col *ngIf="inAdmin">\n              <button (click)="remove(pizza)"\n                ion-button icon-left clear small float-right>\n                <ion-icon name="trash"></ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/pizza-cards/pizza-cards.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_pizza__["a" /* PizzaProvider */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_5__providers_basket__["a" /* BasketProvider */]])
], PizzaCardsPage);

//# sourceMappingURL=pizza-cards.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PizzaProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PizzaProvider = (function () {
    function PizzaProvider(http, socketService) {
        this.http = http;
        this.socketService = socketService;
        this.url = 'https://bobbyzzaiolo-node-goulaheau.c9users.io/pizzas';
        this.pizzaCreated$ = this.socketService.listen('[Pizza] Created');
        this.pizzaUpdated$ = this.socketService.listen('[Pizza] Updated');
        this.pizzaRemoved$ = this.socketService.listen('[Pizza] Removed');
    }
    PizzaProvider.prototype.getAll = function () {
        return this.http.get(this.url);
    };
    PizzaProvider.prototype.get = function (id) {
        return this.http.get(this.url + "/" + id);
    };
    PizzaProvider.prototype.post = function (pizza) {
        return this.http.post(this.url, pizza);
    };
    PizzaProvider.prototype.put = function (id, pizza) {
        return this.http.put(this.url + "/" + id, pizza);
    };
    PizzaProvider.prototype.patch = function (id, pizza) {
        return this.http.patch(this.url + "/" + id, pizza);
    };
    PizzaProvider.prototype.delete = function (id) {
        return this.http.delete(this.url + "/" + id);
    };
    return PizzaProvider;
}());
PizzaProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_2__socket__["a" /* SocketProvider */]])
], PizzaProvider);

//# sourceMappingURL=pizza.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SocketProvider = (function () {
    function SocketProvider() {
        this.socket = __WEBPACK_IMPORTED_MODULE_1_socket_io_client__["connect"]('https://bobbyzzaiolo-node-goulaheau.c9users.io/');
    }
    SocketProvider.prototype.listen = function (event) {
        var _this = this;
        return new __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"](function (observer) {
            _this.socket.on(event, function (data) { return observer.next(data); });
            // dispose of the event listener when unsubscribed
            return function () { return _this.socket.off(event); };
        });
    };
    return SocketProvider;
}());
SocketProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], SocketProvider);

//# sourceMappingURL=socket.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasketProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BasketProvider = (function () {
    function BasketProvider() {
        this.basket = [];
        this.updatedBasket = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
    }
    BasketProvider.prototype.updateBasket = function (action, itemBasket) {
        switch (action) {
            case '[BASKET] ADD_ITEM':
                var found = false;
                for (var i in this.basket) {
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
                for (var i in this.basket) {
                    if (this.basket[i].item.name === itemBasket.item.name) {
                        this.basket[i] = itemBasket;
                        this.updatedBasket.emit(this.basket);
                        break;
                    }
                }
                break;
            case '[BASKET] DELETE_ITEM':
                for (var i in this.basket) {
                    if (this.basket[i].item.name === itemBasket.item.name) {
                        this.basket.splice(+i, 1);
                        this.updatedBasket.emit(this.basket);
                        break;
                    }
                }
                break;
        }
    };
    return BasketProvider;
}());
BasketProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], BasketProvider);

//# sourceMappingURL=basket.js.map

/***/ }),

/***/ 123:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 123;

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 165;

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PizzaDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PizzaDetailPage = (function () {
    function PizzaDetailPage(navParams) {
        this.navParams = navParams;
        this.pizza = this.navParams.data;
    }
    return PizzaDetailPage;
}());
PizzaDetailPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-pizza-detail',template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/pizza-detail/pizza-detail.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bobbyzzaiolo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1>{{ pizza.name }} - {{ pizza.price }} €</h1>\n  <img [src]="pizza.image" alt="">\n  <p>{{ pizza.description }}</p>\n  <p><b>Ingrédients :</b></p>\n  <ul>\n    <li *ngFor="let ingredient of pizza.ingredients">\n      {{ ingredient.name }} - {{ ingredient.weight }} - {{ ingredient.price }} €\n    </li>\n  </ul>\n</ion-content>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/pizza-detail/pizza-detail.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]])
], PizzaDetailPage);

//# sourceMappingURL=pizza-detail.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PizzaFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ingredient__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_pizza__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_admin__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PizzaFormPage = (function () {
    function PizzaFormPage(navCtrl, toastCtrl, navParams, pizzaProvider, ingredientProvider) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.pizzaProvider = pizzaProvider;
        this.ingredientProvider = ingredientProvider;
        this.pizzaImage = '';
        this.pizzaIngredients = [];
        this.adminPage = __WEBPACK_IMPORTED_MODULE_4__admin_admin__["a" /* AdminPage */];
        this.pizza = this.navParams.data;
        if (Object.keys(this.pizza).length !== 0
            && this.pizza.constructor === Object) {
            this.pizzaIngredients = this.pizza.ingredients;
            this.pizzaImage = this.pizza.image;
        }
        else {
            this.pizza = {
                name: '',
                description: '',
                price: '',
                image: '',
                ingredients: []
            };
        }
        this.ingredients$ = this.ingredientProvider.getAll();
    }
    PizzaFormPage.prototype.onSubmit = function () {
        var _this = this;
        var pizza = {
            name: this.pizza.name,
            description: this.pizza.description,
            price: this.pizza.price,
            image: this.pizzaImage,
            ingredients: []
        };
        this.pizzaIngredients.forEach(function (ingredient) { return pizza.ingredients.push(ingredient._id); });
        if (this.pizza._id) {
            this.pizzaProvider.put(this.pizza._id, pizza).subscribe(function (pizza) {
                _this.navCtrl.push(_this.adminPage);
                _this.toastCtrl.create({
                    message: "La pizza " + pizza.name + " a \u00E9t\u00E9 modifi\u00E9e.",
                    duration: 5000,
                    position: 'top'
                }).present();
            }, function () { return _this.toastCtrl.create({
                message: 'Une erreur s\'est produite lors de la modification de la pizza.',
                duration: 5000,
                position: 'top'
            }).present(); });
        }
        else {
            this.pizzaProvider.post(pizza).subscribe(function () { return _this.navCtrl.push(_this.adminPage); }, function () { return _this.toastCtrl.create({
                message: 'Une erreur s\'est produite lors de la création de la pizza.',
                duration: 5000,
                position: 'top'
            }).present(); });
        }
    };
    PizzaFormPage.prototype.onClickIngredient = function (ingredient) {
        var found = false;
        for (var i in this.pizzaIngredients) {
            if (this.pizzaIngredients[i]._id === ingredient._id) {
                found = true;
                this.pizzaIngredients.splice(+i, 1);
                break;
            }
        }
        if (!found) {
            this.pizzaIngredients.push(ingredient);
        }
    };
    PizzaFormPage.prototype.onChangeImage = function (event) {
        var _this = this;
        var myReader = new FileReader();
        myReader.readAsDataURL(event.target.files[0]);
        myReader.onloadend = function () {
            _this.pizzaImage = myReader.result;
        };
    };
    PizzaFormPage.prototype.isClicked = function (ingredient) {
        for (var i in this.pizzaIngredients) {
            if (this.pizzaIngredients[i]._id === ingredient._id) {
                return false;
            }
        }
        return true;
    };
    return PizzaFormPage;
}());
PizzaFormPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-pizza-form',template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/pizza-form/pizza-form.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bobbyzzaiolo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1>{{ pizza._id ? \'Modifier\' : \'Ajouter\' }} une pizza</h1>\n  <form (ngSubmit)="onSubmit()">\n    <ion-list>\n      <ion-item>\n        <ion-label>Nom</ion-label>\n        <ion-input type="text"\n                   [(ngModel)]="pizza.name"\n                   name="name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Description</ion-label>\n        <ion-textarea [(ngModel)]="pizza.description"\n                      name="description">\n        </ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Prix</ion-label>\n        <ion-input type="text"\n                   [(ngModel)]="pizza.price"\n                   name="price"></ion-input>\n      </ion-item>\n\n      <img [src]="pizzaImage" alt=""/>\n\n      <ion-item>\n        <ion-label>Image</ion-label>\n        <ion-input type="file" (change)="onChangeImage($event)"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Ingrédients</ion-label>\n      </ion-item>\n    </ion-list>\n\n    <div>\n      <button *ngFor="let ingredient of ingredients$ | async"\n              (click)="onClickIngredient(ingredient)"\n              [outline]="isClicked(ingredient)"\n              ion-button small type="button">\n        {{ ingredient.name }}\n      </button>\n    </div>\n\n\n    <button ion-button>{{ pizza._id ? \'Modifier\' : \'Ajouter\' }}</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/pizza-form/pizza-form.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__providers_pizza__["a" /* PizzaProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers_ingredient__["a" /* IngredientProvider */]])
], PizzaFormPage);

//# sourceMappingURL=pizza-form.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IngredientCardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_ingredient__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ingredient_form_ingredient_form__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IngredientCardsPage = (function () {
    function IngredientCardsPage(ingredientProvider, toastCtrl) {
        var _this = this;
        this.ingredientProvider = ingredientProvider;
        this.toastCtrl = toastCtrl;
        this.ingredientFormPage = __WEBPACK_IMPORTED_MODULE_3__ingredient_form_ingredient_form__["a" /* IngredientFormPage */];
        this.subscriptions = [];
        this.subscriptions.push(this.ingredientProvider.getAll().subscribe(function (ingredients) { return _this.ingredients = ingredients; }));
        this.subscriptions.push(this.ingredientProvider.ingredientCreated$.subscribe(function (res) {
            if (_this.ingredients) {
                _this.ingredients.push(res);
            }
        }));
        this.subscriptions.push(this.ingredientProvider.ingredientUpdated$.subscribe(function (res) {
            if (_this.ingredients) {
                for (var i in _this.ingredients) {
                    if (_this.ingredients[i]._id === res._id) {
                        _this.ingredients[i] = res;
                        break;
                    }
                }
            }
        }));
        this.subscriptions.push(this.ingredientProvider.ingredientRemoved$.subscribe(function (res) {
            if (_this.ingredients) {
                for (var i in _this.ingredients) {
                    if (_this.ingredients[i]._id === res._id) {
                        _this.ingredients.splice(+i, 1);
                        break;
                    }
                }
            }
        }));
    }
    IngredientCardsPage.prototype.remove = function (ingredient) {
        var _this = this;
        this.ingredientProvider.delete(ingredient._id).subscribe(function (res) { return _this.toastCtrl.create({
            message: "L'ingredient " + res.name + " a \u00E9t\u00E9 supprim\u00E9.",
            duration: 5000,
            position: 'top'
        }).present(); }, function () { return _this.toastCtrl.create({
            message: 'Une erreur s\'est produite lors de la modification de la ingredient.',
            duration: 5000,
            position: 'top'
        }).present(); });
    };
    IngredientCardsPage.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    return IngredientCardsPage;
}());
IngredientCardsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ingredient-cards',template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/ingredient-cards/ingredient-cards.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bobbyzzaiolo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <h1>\n          Ingrédients\n          <ion-icon name="add-circle"\n                    [navPush]="ingredientFormPage"\n                    small>\n          </ion-icon>\n        </h1>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-lg-2 col-md-3 col-sm-6\n               *ngFor="let ingredient of ingredients">\n        <ion-card>\n          <ion-card-header>\n            {{ingredient.name}} - {{ingredient.price}} €\n          </ion-card-header>\n\n          <ion-card-content>\n            {{ ingredient.weight }}\n          </ion-card-content>\n\n          <ion-row>\n            <ion-col>\n              <button [navPush]="ingredientFormPage"\n                      [navParams]="ingredient"\n                      ion-button icon-left clear small>\n                <ion-icon name="create"></ion-icon>\n              </button>\n            </ion-col>\n            <ion-col>\n              <button (click)="remove(ingredient)"\n                      ion-button icon-left clear small float-right>\n                <ion-icon name="trash"></ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/ingredient-cards/ingredient-cards.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_ingredient__["a" /* IngredientProvider */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ToastController */]])
], IngredientCardsPage);

//# sourceMappingURL=ingredient-cards.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IngredientFormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_ingredient__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__admin_admin__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IngredientFormPage = (function () {
    function IngredientFormPage(navCtrl, toastCtrl, navParams, ingredientProvider) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.ingredientProvider = ingredientProvider;
        this.adminPage = __WEBPACK_IMPORTED_MODULE_3__admin_admin__["a" /* AdminPage */];
        this.ingredient = this.navParams.data;
        if (Object.keys(this.ingredient).length === 0
            && this.ingredient.constructor === Object) {
            this.ingredient = {
                name: '',
                weight: '',
                price: ''
            };
        }
        this.ingredients$ = this.ingredientProvider.getAll();
    }
    IngredientFormPage.prototype.onSubmit = function () {
        var _this = this;
        var ingredient = {
            name: this.ingredient.name,
            weight: this.ingredient.weight,
            price: this.ingredient.price
        };
        if (this.ingredient._id) {
            this.ingredientProvider.put(this.ingredient._id, ingredient).subscribe(function (ingredient) {
                _this.navCtrl.push(_this.adminPage, { tab: 1 });
                _this.toastCtrl.create({
                    message: "L'ingredient " + ingredient.name + " a \u00E9t\u00E9 modifi\u00E9.",
                    duration: 5000,
                    position: 'top'
                }).present();
            }, function () { return _this.toastCtrl.create({
                message: 'Une erreur s\'est produite lors de la modification de l\' ingredient.',
                duration: 5000,
                position: 'top'
            }).present(); });
        }
        else {
            this.ingredientProvider.post(ingredient).subscribe(function (ingredient) {
                _this.navCtrl.push(_this.adminPage, { tab: 1 });
                _this.toastCtrl.create({
                    message: "L'ingredient " + ingredient.name + " a \u00E9t\u00E9 cr\u00E9\u00E9.",
                    duration: 5000,
                    position: 'top'
                }).present();
            }, function () { return _this.toastCtrl.create({
                message: 'Une erreur s\'est produite lors de la création de l\' ingredient.',
                duration: 5000,
                position: 'top'
            }).present(); });
        }
    };
    return IngredientFormPage;
}());
IngredientFormPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-ingredient-form',template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/ingredient-form/ingredient-form.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bobbyzzaiolo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <h1>{{ ingredient._id ? \'Modifier\' : \'Ajouter\' }} un ingrédient</h1>\n  <form (ngSubmit)="onSubmit()">\n    <ion-list>\n      <ion-item>\n        <ion-label>Nom</ion-label>\n        <ion-input type="text"\n                   [(ngModel)]="ingredient.name"\n                   name="name">\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Grammage</ion-label>\n        <ion-input type="text"\n                   [(ngModel)]="ingredient.weight"\n                   name="weight">\n        </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Prix</ion-label>\n        <ion-input type="text"\n                   [(ngModel)]="ingredient.price"\n                   name="price">\n        </ion-input>\n      </ion-item>\n    </ion-list>\n\n    <button ion-button>{{ ingredient._id ? \'Modifier\' : \'Ajouter\' }}</button>\n  </form>\n</ion-content>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/ingredient-form/ingredient-form.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ToastController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_ingredient__["a" /* IngredientProvider */]])
], IngredientFormPage);

//# sourceMappingURL=ingredient-form.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasketPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_basket__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BasketPage = (function () {
    function BasketPage(basketProdiver) {
        var _this = this;
        this.basketProdiver = basketProdiver;
        this.subscriptions = [];
        this.basket = this.basketProdiver.basket;
        this.subscriptions.push(this.basketProdiver.updatedBasket.subscribe(function (basket) { return _this.basket = basket; }));
    }
    BasketPage.prototype.getBasketTotal = function () {
        var total = 0;
        this.basket.forEach(function (itemBasket) { return total += (+itemBasket.item.price * itemBasket.quantity); });
        return total;
    };
    BasketPage.prototype.onChangeQuantity = function (quantity, itemBasket) {
        itemBasket.quantity = quantity;
        if (itemBasket.quantity < 0) {
            itemBasket.quantity = 0;
        }
        this.basketProdiver.updateBasket('[BASKET] UPDATE_ITEM', itemBasket);
    };
    BasketPage.prototype.onDeleteItem = function (itemBasket) {
        this.basketProdiver.updateBasket('[BASKET] DELETE_ITEM', itemBasket);
    };
    BasketPage.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    return BasketPage;
}());
BasketPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-basket',template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/basket/basket.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Bobbyzzaiolo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <h1>Panier - {{ getBasketTotal() }} €</h1>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-lg-4 col-sm-6 *ngFor="let itemBasket of basket">\n        <ion-card>\n          <ion-card-header>\n            {{ itemBasket.item.name }} - {{ +itemBasket.item.price * itemBasket.quantity }} €\n          </ion-card-header>\n\n          <ion-card-content>\n            <img [src]="itemBasket.item.image"\n                 alt="">\n          </ion-card-content>\n\n          <ion-row>\n            <ion-col>\n              Quantité\n              <input type="number"\n                     [ngModel]="itemBasket.quantity"\n                     (ngModelChange)="onChangeQuantity($event, itemBasket)"\n                     min="0">\n            </ion-col>\n            <ion-col>\n              <button ion-button (click)="onDeleteItem(itemBasket)" float-right>\n                <ion-icon name="trash"></ion-icon>\n              </button>\n            </ion-col>\n          </ion-row>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/basket/basket.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_basket__["a" /* BasketProvider */]])
], BasketPage);

//# sourceMappingURL=basket.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(244);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 244:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_pizza_cards_pizza_cards__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_pizza__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_pizza_detail_pizza_detail__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_common_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_admin_admin__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_pizza_form_pizza_form__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_ingredient__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_socket__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_ingredient_cards_ingredient_cards__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_ingredient_form_ingredient_form__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__providers_basket__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_basket_basket__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















var pages = [
    __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
    __WEBPACK_IMPORTED_MODULE_11__pages_admin_admin__["a" /* AdminPage */],
    __WEBPACK_IMPORTED_MODULE_7__pages_pizza_cards_pizza_cards__["a" /* PizzaCardsPage */],
    __WEBPACK_IMPORTED_MODULE_9__pages_pizza_detail_pizza_detail__["a" /* PizzaDetailPage */],
    __WEBPACK_IMPORTED_MODULE_12__pages_pizza_form_pizza_form__["a" /* PizzaFormPage */],
    __WEBPACK_IMPORTED_MODULE_15__pages_ingredient_cards_ingredient_cards__["a" /* IngredientCardsPage */],
    __WEBPACK_IMPORTED_MODULE_16__pages_ingredient_form_ingredient_form__["a" /* IngredientFormPage */],
    __WEBPACK_IMPORTED_MODULE_18__pages_basket_basket__["a" /* BasketPage */]
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["L" /* NgModule */])({
        declarations: pages,
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_common__["b" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_10__angular_common_http__["b" /* HttpClientModule */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
        entryComponents: pages,
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_8__providers_pizza__["a" /* PizzaProvider */],
            __WEBPACK_IMPORTED_MODULE_13__providers_ingredient__["a" /* IngredientProvider */],
            __WEBPACK_IMPORTED_MODULE_14__providers_socket__["a" /* SocketProvider */],
            __WEBPACK_IMPORTED_MODULE_17__providers_basket__["a" /* BasketProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_pizza_cards_pizza_cards__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_admin_admin__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_basket_basket__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_pizza_cards_pizza_cards__["a" /* PizzaCardsPage */];
        this.initializeApp();
        this.pages = [
            { title: 'La carte', component: __WEBPACK_IMPORTED_MODULE_4__pages_pizza_cards_pizza_cards__["a" /* PizzaCardsPage */] },
            { title: 'Panier', component: __WEBPACK_IMPORTED_MODULE_6__pages_basket_basket__["a" /* BasketPage */] },
            { title: 'Administration', component: __WEBPACK_IMPORTED_MODULE_5__pages_admin_admin__["a" /* AdminPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let page of pages" (click)="openPage(page)">\n        {{page.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
        __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 316:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IngredientProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__socket__ = __webpack_require__(110);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IngredientProvider = (function () {
    function IngredientProvider(http, socketService) {
        this.http = http;
        this.socketService = socketService;
        this.url = 'https://bobbyzzaiolo-node-goulaheau.c9users.io/ingredients';
        this.ingredientCreated$ = this.socketService.listen('[Ingredient] Created');
        this.ingredientUpdated$ = this.socketService.listen('[Ingredient] Updated');
        this.ingredientRemoved$ = this.socketService.listen('[Ingredient] Removed');
    }
    IngredientProvider.prototype.getAll = function () {
        return this.http.get(this.url);
    };
    IngredientProvider.prototype.get = function (id) {
        return this.http.get(this.url + "/" + id);
    };
    IngredientProvider.prototype.post = function (ingredient) {
        return this.http.post(this.url, ingredient);
    };
    IngredientProvider.prototype.put = function (id, ingredient) {
        return this.http.put(this.url + "/" + id, ingredient);
    };
    IngredientProvider.prototype.patch = function (id, ingredient) {
        return this.http.patch(this.url + "/" + id, ingredient);
    };
    IngredientProvider.prototype.delete = function (id) {
        return this.http.delete(this.url + "/" + id);
    };
    return IngredientProvider;
}());
IngredientProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */],
        __WEBPACK_IMPORTED_MODULE_2__socket__["a" /* SocketProvider */]])
], IngredientProvider);

//# sourceMappingURL=ingredient.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pizza_cards_pizza_cards__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ingredient_cards_ingredient_cards__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminPage = (function () {
    function AdminPage(navParams) {
        this.navParams = navParams;
        this.pizzaCardsRoot = __WEBPACK_IMPORTED_MODULE_1__pizza_cards_pizza_cards__["a" /* PizzaCardsPage */];
        this.ingredientCardsRoot = __WEBPACK_IMPORTED_MODULE_2__ingredient_cards_ingredient_cards__["a" /* IngredientCardsPage */];
        this.rootParams = { admin: true };
        this.tab = this.navParams.data.tab ? this.navParams.data.tab : 0;
    }
    return AdminPage;
}());
AdminPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-admin',template:/*ion-inline-start:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/admin/admin.html"*/'<ion-tabs [selectedIndex]="tab">\n  <ion-tab [root]="pizzaCardsRoot"\n           [rootParams]="rootParams"\n           tabTitle="Pizzas">\n  </ion-tab>\n  <ion-tab [root]="ingredientCardsRoot"\n           tabTitle="Ingrédients">\n  </ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/home/goulaheau/IdeaProjects/bobbyzzaiolo-ionic/src/pages/admin/admin.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* NavParams */]])
], AdminPage);

//# sourceMappingURL=admin.js.map

/***/ })

},[226]);
//# sourceMappingURL=main.js.map