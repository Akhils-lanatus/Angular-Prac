import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalculatorService } from '../services/calculator.service';
import { CommonModule } from '@angular/common';
import { CustomAlertComponent } from '../common/custom-alert/custom-alert.component';

enum TServices {
  ADD = 'add',
  SUB = 'sub',
  DIV = 'div',
  MULTI = 'multi',
}

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomAlertComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  CalculatorService = inject(CalculatorService);
  value: number = 0;
  num1: number = 0;
  num2: number = 0;
  selectedService: TServices = TServices.ADD;
  operations = Object.values(TServices);
  private readonly operationsMap = {
    [TServices.ADD]: (x: number, y: number) =>
      this.CalculatorService.getSum({ x, y }),
    [TServices.SUB]: (x: number, y: number) =>
      this.CalculatorService.getSub({ x, y }),
    [TServices.DIV]: (x: number, y: number) =>
      this.CalculatorService.getDiv({ x, y }),
    [TServices.MULTI]: (x: number, y: number) =>
      this.CalculatorService.getMul({ x, y }),
  };
  handleSubmit(e: Event) {
    e.preventDefault();
    this.value = this.operationsMap[this.selectedService](this.num1, this.num2);
    this.resetForm();
  }
  resetForm() {
    this.num1 = 0;
    this.num2 = 0;
    this.selectedService = TServices.ADD;
  }
}
