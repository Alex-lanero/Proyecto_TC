import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  message = signal<string | null>(null);
  type = signal<'success' | 'error' | 'info'>('info');

  show(msg: string, type: 'success' | 'error' | 'info' = 'info') {
    this.message.set(msg);
    this.type.set(type);

    setTimeout(() => {
      this.clear();
    }, 3000);
  }

  clear() {
    this.message.set(null);
  }
}