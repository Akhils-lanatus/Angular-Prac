import { Component } from '@angular/core';
import { CustomAlertComponent } from '../../common/custom-alert/custom-alert.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, JsonPipe } from '@angular/common';

interface IFormData {
  firstName: string;
  lastName: string;
  userName: string;
  city: string;
  state: string;
  zip: number;
  isTermsAgreed: boolean;
}

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [CustomAlertComponent, FormsModule, CommonModule, JsonPipe],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
})
export class TemplateComponent {
  atTheRate: string = '@';
  cities: string[] = [
    'Ahmedabad',
    'Baroda',
    'Bhopal',
    'Mumbai',
    'Pune',
    'Lonavala',
    'Goa',
    'Punjab',
    'Udaipur',
  ];
  states: string[] = ['Gujarat', 'MP', 'Maharastra', 'Delhi', 'UP', 'Kerala'];
  dataObject: IFormData = {
    firstName: '',
    lastName: '',
    userName: '',
    city: '',
    state: '',
    zip: 0,
    isTermsAgreed: false,
  };
  formValue: any;
  onSubmit(form: any, first: any) {
    console.log(first, form);

    this.formValue = { ...this.dataObject };
  }
}
