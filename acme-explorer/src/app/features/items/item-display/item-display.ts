import { Component } from '@angular/core';
import {type Item} from "../item.model";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-display',
  imports: [FormsModule],
  templateUrl: './item-display.html',
  styleUrl: './item-display.scss',
})

export class ItemDisplay {

  item: Item = {
    id: '1',
    version: 0,
    sku: '52-AB32',
    name: 'Berries Mix',
    description: 'Berry mix has a delicious blend of strawberries, blueberries, and raspberries. Perfect for smoothies, desserts, or as a healthy snack.',
    price: 6.4,
    imageUrl: '/images/berries-mix.jpg',
    comments: ['Great product!', 'Would buy again.'],
    available: true
  };

  get comments() {
    return this.item.comments
  }

  removeItem() {
    this.item.available = false;
  }

}
