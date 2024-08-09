import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3002'); // Replace with your server URL
  }

  // Example method to emit an event
  emitEvent(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Example method to listen for an event
  onEvent(eventName: string): Observable<any> {
    return new Observable(observer => {
      this.socket.on(eventName, (data: any) => {
        observer.next(data);
      });
    });
  }
}
