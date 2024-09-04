import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type TAlertTypes =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.css',
})
export class CustomAlertComponent {
  @Input() alertType: TAlertTypes = 'dark';
  @Input({ required: true }) alertTitle: string = '';
  @Input({ required: true }) alertMessage: string = '';
}
