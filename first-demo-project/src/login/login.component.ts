import { Component } from '@angular/core';
import { CustomAlertComponent } from '../common/custom-alert/custom-alert.component';
import { TAlertTypes } from '../common/custom-alert/custom-alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CustomAlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  alertType: TAlertTypes = 'warning';
}
