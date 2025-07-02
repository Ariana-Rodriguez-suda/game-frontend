import { Component, OnInit } from '@angular/core';
import { ShopService } from './shop.service';
import { CommonModule, NgForOf } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, NgForOf],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  items: any[] = [];
  playerId: string | null = null;

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.playerId = localStorage.getItem('userId');
    if (!this.playerId) return;

    this.shopService.getItems().subscribe({
      next: (res) => (this.items = res),
      error: () => alert('Error al cargar la tienda'),
    });
  }

  comprar(itemId: number) {
    if (!this.playerId) return;

    this.shopService.buyItem(+this.playerId, itemId).subscribe({
      next: () => alert('Compra realizada'),
      error: () => alert('No se pudo comprar'),
    });
  }
}
