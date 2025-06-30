import { Component, OnInit } from '@angular/core';
import { InventoryService } from './inventory.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Inventario</h2>
    <ul>
      <li *ngFor="let item of inventory">
        {{ item.name }} - Cantidad: {{ item.quantity }}
      </li>
    </ul>
  `,
})
export class InventoryComponent implements OnInit {
  inventory: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    const playerId = localStorage.getItem('userId') || '';
    if (playerId) {
      this.inventoryService.getInventory(playerId).subscribe(items => {
        this.inventory = items;
      });
    }
  }
}
