import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirstServiceService {
  add(x: number, y: number) {
    return x + y;
  }
}
