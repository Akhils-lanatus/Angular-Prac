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
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent {
  exampleForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    friends: new FormArray([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
    ]),
  });

  formData = {};

  handleSubmit(e: Event) {
    e.preventDefault();

    if (this.exampleForm.invalid) {
      this.exampleForm.markAllAsTouched();
      return;
    }

    this.formData = { ...this.exampleForm.value };
    this.exampleForm.reset();
  }

  shouldShowError(controlName: string | number): boolean {
    if (typeof controlName === 'number') {
      const control = this.friendsControls as FormArray;
      return control.invalid && (control.touched || control.dirty);
    }
    const control = this.exampleForm.get(controlName) as FormControl;
    return control.invalid && (control.dirty || control.touched);
  }

  getError(controlName: string | number, controlLabel?: string): string {
    let errors = '';

    if (typeof controlName === 'number') {
      const controlArray = this.friendsControls.at(controlName) as FormControl;
      errors = this.getErrorMessage(controlArray, controlLabel);
    } else {
      const control = this.exampleForm.get(controlName) as FormControl;
      errors = this.getErrorMessage(control, controlLabel);
    }

    return errors;
  }

  private getErrorMessage(control: FormControl, controlLabel?: string): string {
    if (control.errors) {
      if (control.errors?.['required']) {
        return `${controlLabel} is required`;
      } else if (control.errors?.['minlength']) {
        return `Minimum length for ${controlLabel} is ${control.errors?.['minlength'].requiredLength}`;
      } else if (control.errors?.['maxlength+']) {
        return `Minimum length for ${controlLabel} is ${control.errors?.['maxlength'].requiredLength}`;
      } else if (control.errors?.['email']) {
        return 'Invalid email format';
      }
    }
    return '';
  }

  addNewFriend() {
    this.friendsControls.push(new FormControl('', Validators.required));
    this.exampleForm.reset();
  }

  endFriendship(index: number) {
    const friends = this.friendsControls;
    if (friends.length > 1) {
      friends.removeAt(index);
    }
  }

  get friendsControls() {
    return this.exampleForm.get('friends') as FormArray;
  }
}
