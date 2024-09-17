import { Component } from '@angular/core';
import { HighlightDirective } from '../direcives/highlight.directive';

@Component({
  selector: 'app-test-dor',
  standalone: true,
  imports: [HighlightDirective],
  templateUrl: './test-dor.component.html',
  styleUrl: './test-dor.component.css',
})
export class TestDorComponent {
  val: string = 'Jai Hind';
  isItSo: boolean = false;
  customNgIf: boolean = false;
  toggler() {
    this.isItSo = !this.isItSo;
    this.customNgIf = !this.customNgIf;
  }
}
