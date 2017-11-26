import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Pizza } from '../models/pizza';
import { SocketProvider } from './socket';

@Injectable()
export class PizzaProvider {
  private url = 'https://bobbyzzaiolo-node-goulaheau.c9users.io/pizzas';

  pizzaCreated$: Observable<Pizza>;
  pizzaUpdated$: Observable<Pizza>;
  pizzaRemoved$: Observable<Pizza>;

  constructor(private http: HttpClient,
              private socketService: SocketProvider) {
    this.pizzaCreated$ = this.socketService.listen('[Pizza] Created');
    this.pizzaUpdated$ = this.socketService.listen('[Pizza] Updated');
    this.pizzaRemoved$ = this.socketService.listen('[Pizza] Removed');
  }

  getAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.url);
  }

  get(id: string): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.url}/${id}`);
  }

  post(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.url, pizza);
  }

  put(id: string, pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.url}/${id}`, pizza);
  }

  patch(id: string, pizza: Partial<Pizza>): Observable<Pizza> {
    return this.http.patch<Pizza>(`${this.url}/${id}`, pizza);
  }

  delete(id: string): Observable<Pizza> {
    return this.http.delete<Pizza>(`${this.url}/${id}`);
  }
}
