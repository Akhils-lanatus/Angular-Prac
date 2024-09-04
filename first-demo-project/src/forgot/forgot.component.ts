import { Component, EventEmitter, Output } from '@angular/core';
import {
  CustomAlertComponent,
  TAlertTypes,
} from '../common/custom-alert/custom-alert.component';
import { ButtonComponent } from '../common/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [CustomAlertComponent, ButtonComponent, CommonModule],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  alertType: TAlertTypes = 'danger';
  buttonType: TAlertTypes = 'dark';
  isValueEmpty: boolean = true;
  isInitialLoad = true;
  onClick(e: Event, x: number) {
    alert(`Called from forgot 😁 ,${e} ${x}`);
  }
  onUserInput(user: HTMLInputElement) {
    this.isValueEmpty = !user.value.trim();
    this.isInitialLoad = false;
  }
  @Output() dataEvent = new EventEmitter<string>();
  getUserAndClear(userInput: HTMLInputElement): void {
    if (userInput.value.trim() !== '') {
      const userValue = userInput.value;
      this.getUser(userValue);
      this.dataEvent.emit(userValue);
      userInput.value = '';
      this.isValueEmpty = true;
    } else {
      this.isValueEmpty = true;
    }
  }

  getUser(value: string): void {
    console.log('User:', value);
  }
}
