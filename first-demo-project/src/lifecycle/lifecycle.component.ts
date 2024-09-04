import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ViewComponent } from '../queries/view/view.component';

@Component({
  selector: 'app-lifecycle',
  standalone: true,
  imports: [ViewComponent],
  templateUrl: './lifecycle.component.html',
  styleUrl: './lifecycle.component.css',
})
export class LifecycleComponent implements OnInit, OnChanges {
  @Input() name: string = '';
  constructor() {
    console.log('I am the boss');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  ngOnInit(): void {
    console.log('OnInit called ');
  }
}
