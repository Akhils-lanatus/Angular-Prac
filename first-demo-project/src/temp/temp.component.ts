import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temp',
  standalone: true,
  imports: [],
  templateUrl: './temp.component.html',
  styleUrl: './temp.component.css',
})
export class TempComponent {
  @Input({ transform: trimString }) label = 'DUMMY_LABEL';
}

function trimString(value: string | undefined) {
  return value?.trim().toLowerCase() ?? '';
}
