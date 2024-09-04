import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-card-header',
  standalone: true,
  template: '<h1>Jai Hind</h1><h2>Hi</h2>',
})
export class CustomCardHeader {
  text: string = 'Namaste';
}

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CustomCardHeader, CommonModule],
  template: '<custom-card-header >Save</custom-card-header>',
  styleUrl: './view.component.css',
})
export class ViewComponent implements AfterViewInit {
  @ViewChild(CustomCardHeader) header!: CustomCardHeader;
  @ViewChild(CustomCardHeader) list!: QueryList<CustomCardHeader>;
  ngAfterViewInit() {
    console.log(this.header);
    console.log(this.list);
  }
}
