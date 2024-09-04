import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  output,
  Output,
} from '@angular/core';
import { IProducts } from '../products/products.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  @Input() selectedProduct: Partial<IProducts> = {};
  // @Output() removeBtnClick = new EventEmitter();
  rmb = output<void>({ alias: 'removeBtnClick' });
  onClick() {
    this.rmb.emit();
  }
}
