import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Pizza } from '../../models/pizza';

@Injectable()
export class PizzaProvider {
  private url = 'https://bobbyzzaiolo-node-goulaheau.c9users.io/pizzas';

  constructor(private http: HttpClient) {
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
