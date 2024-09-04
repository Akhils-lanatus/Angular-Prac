import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TAlertTypes } from '../custom-alert/custom-alert.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() buttonType: TAlertTypes = 'danger';
  @Input() buttonText: string = '';
  @Output() onBtnClick = new EventEmitter<any>();
  onClick() {
    this.onBtnClick.emit('Hey');
  }
}
