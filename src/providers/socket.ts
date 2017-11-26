import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketProvider {

  private socket: io.Socket;

  constructor() {
    this.socket = io.connect('https://bobbyzzaiolo-node-goulaheau.c9users.io/');
  }

  listen(event: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(event, data => observer.next(data));
      // dispose of the event listener when unsubscribed
      return () => this.socket.off(event);
    });
  }

}
