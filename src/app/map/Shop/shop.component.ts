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

  // Precios y nombres por defecto (si el backend no los trae)
  defaultItems = [
    { id: 1, name: 'Sombrero de Vaquero', price: 5, image: 'item-1.png' },
    { id: 2, name: 'Sombrero de Santa', price: 7, image: 'item-2.png' },
    { id: 3, name: 'Sombrero de Mago', price: 10, image: 'item-3.png' },
    { id: 4, name: 'Sombrero elegante', price: 4, image: 'item-4.png' },
    { id: 5, name: 'Sombrero de paja', price: 6, image: 'item-5.png' },
    { id: 6, name: 'Beanie', price: 8, image: 'item-6.png' },
    { id: 7, name: 'Sombrero mexicano', price: 3, image: 'item-7.png' },
  ];

  constructor(private shopService: ShopService) {}

  ngOnInit() {
    this.playerId = localStorage.getItem('userId');
    this.shopService.getItems().subscribe({
      next: (res) => {
        // Si backend no trae nombre o precio, usar default
        this.items = res.map((item: any) => {
          const defaultItem = this.defaultItems.find(d => d.id === item.id);
          return {
            ...item,
            name: item.name || (defaultItem ? defaultItem.name : 'Ítem'),
            price: item.price || (defaultItem ? defaultItem.price : 0),
            image: item.image || (defaultItem ? defaultItem.image : 'item-1.png')
          };
        });
      },
      error: () => {
        alert('Error al cargar la tienda');
        this.items = [...this.defaultItems];
      },
    });
  }

  comprar(itemId: number) {
    // Por ahora no hacer nada porque monedas no implementadas
    alert('La compra no está habilitada aún.');
  }

    goBack() {
  history.back(); // o this.router.navigate(['/teacher-profile']);
}
}
