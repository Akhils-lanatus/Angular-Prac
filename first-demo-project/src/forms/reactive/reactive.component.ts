import { Component } from '@angular/core';
import { CustomAlertComponent } from '../../common/custom-alert/custom-alert.component';
import {
  FormArray,
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
    friends: new FormArray([new FormControl(null, Validators.required)]),
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

  shouldShowError(controlName: string | number): any {
    const field = this.exampleForm.controls[controlName];

    if (typeof controlName === 'number') {
      const control = this.friendsControls.at(controlName);
      return control.invalid && (control.touched || this.isFormSubmitted);
    }

    if (typeof controlName === 'string') {
      return (
        field.invalid &&
        (field.errors || false) &&
        (field.dirty || field.touched)
      );
    }
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

  addNewFriend() {
    const friends = this.exampleForm.get('friends') as FormArray;
    friends.push(new FormControl(null, Validators.required));
  }

  endFriendship(index: number) {
    const friends = this.exampleForm.get('friends') as FormArray;
    if (friends.length > 1) {
      friends.removeAt(index);
    }
  }

  get friendsControls() {
    const friends = this.exampleForm.get('friends') as FormArray;
    return friends.controls;
  }
}
