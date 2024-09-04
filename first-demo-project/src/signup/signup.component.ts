import { Component } from '@angular/core';
import {
  CustomAlertComponent,
  TAlertTypes,
} from '../common/custom-alert/custom-alert.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CustomAlertComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  alertType: TAlertTypes = 'primary';
}
