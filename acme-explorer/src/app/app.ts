import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemDisplay } from "./features/items/item-display/item-display";

@Component({
  selector: 'app-root',
  imports: [ItemDisplay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('acme-supermarket');
}
