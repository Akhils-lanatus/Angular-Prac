import { Injectable } from '@angular/core';
import { FirstServiceService } from './first-service.service';
@Injectable({
  providedIn: 'root',
})
export class TestService {
  name: string = '';
  email: string = '';
  add(x: number, y: number) {
    return x * y;
  }
}
