import { Component, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customform',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './customform.component.html',
  styleUrl: './customform.component.css',
})
export class CustomformComponent implements ControlValueAccessor {
  @Input() name = '';
  @Input() email = '';

  onChange = (value: { name: string; email: string }) => {};
  onTouched = () => {};

  writeValue(value: { name: string; email: string }): void {
    if (value) {
      this.name = value.name;
      this.email = value.email;
    }
  }

  registerOnChange(fn: (value: { name: string; email: string }) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  onNameChange(value: string): void {
    this.name = value;
    this.onChange({ name: this.name, email: this.email });
  }

  onEmailChange(value: string): void {
    this.email = value;
    this.onChange({ name: this.name, email: this.email });
  }
}
