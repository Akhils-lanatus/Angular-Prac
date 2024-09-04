import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FirstServiceService } from '../services/first-service.service';
interface IIngredientList {
  name: string;
  quantity: number;
}
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],

  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  title = 'Jai Hind';
  buttonTitle = 'Jai Hind';
  isValid = false;
  id = 'div-one';
  isAdmin = true;

  ingredientList: IIngredientList[] = [
    { name: 'noodles', quantity: 1 },
    { name: 'miso broth', quantity: 1 },
    { name: 'egg', quantity: 2 },
  ];
  myTrack(index: number, item: IIngredientList) {
    return item.quantity;
  }
  toggleAdmin = () => (this.isAdmin = !this.isAdmin);
  num1 = 0;
  num2 = 0;

  name: string = '';

  private addService = inject(FirstServiceService);
  sum: number = 0;

  handleSubmit(e: Event) {
    e.preventDefault();
    this.sum = this.addService.add(this.num1, this.num2);
    this.num1 = 0;
    this.num2 = 0;
  }

  users: string[] = ['Akhil', 'Shraddha', 'Jadoo', 'Rocky', 'Garuda'];

  addUser(value: string) {
    this.users.push(value);
  }
}
