import { Component } from '@angular/core';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
export interface IProducts {
  name: string;
  id: number;
  price: number;
}
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductListComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  products: IProducts[] = [
    { name: 'Mac book', id: 245, price: 78000 },
    { name: 'Samsung book', id: 145, price: 88000 },
    { name: 'Red mi book', id: 45, price: 98000 },
  ];
  selectedProduct = {};
  setSelectedProduct(data: IProducts) {
    this.selectedProduct = data;
  }
  unsetSelectedProduct() {
    this.selectedProduct = {};
  }
}
