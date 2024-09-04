import { Component } from '@angular/core';
import { CustomAlertComponent } from '../../common/custom-alert/custom-alert.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [CustomAlertComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css',
})
export class ReactiveComponent {
  exampleForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  isFormSubmitted: boolean = false;

  handleSubmit(e: SubmitEvent) {
    this.isFormSubmitted = true;
    e.preventDefault();
    if (this.exampleForm.invalid) {
      this.exampleForm.markAllAsTouched();
      return;
    }

    this.exampleForm.reset();
    this.isFormSubmitted = false;
  }

  shouldShowError(controlName: string): boolean {
    const field = this.exampleForm.controls[controlName];

    return (
      field.invalid && (field.errors || false) && (field.dirty || field.touched)
    );
  }

  getError(controlName: string, controlLabel: string): string {
    const control = this.exampleForm.controls[controlName];
    if (this.isFormSubmitted) {
      if (control.errors?.['required']) {
        return `${controlLabel} is required`;
      } else if (control.errors?.['minlength']) {
        return `Minimum length for ${controlLabel} is ${control.errors?.['minlength']?.['requiredLength']}`;
      } else if (control.errors?.['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }
}
