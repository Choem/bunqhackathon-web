import {Injectable} from '@angular/core';

import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

declare const io;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {}

  public initSocket() {
    this.socket = io(environment.apiUrl, {path: '/socket.io'});
  }

  public send(message: any) {
    this.socket.emit('message', message);
  }

  public onConnection() {

  }

  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }

  public onEvent(event: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(event, a => observer.next(a));
    });
  }
}
