import { Injectable } from '@angular/core';

interface CalcServicePropTypes {
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  getSum({ x, y }: CalcServicePropTypes) {
    return x + y;
  }
  getSub({ x, y }: CalcServicePropTypes) {
    return x - y;
  }
  getDiv({ x, y }: CalcServicePropTypes) {
    return x / y;
  }
  getMul({ x, y }: CalcServicePropTypes) {
    return x * y;
  }
}
