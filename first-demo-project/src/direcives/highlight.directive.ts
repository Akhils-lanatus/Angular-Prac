import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private render: Renderer2,
    private templateRef: TemplateRef<any>,
    private container: ViewContainerRef
  ) {
    // el.nativeElement.style.backgroundColor = 'red';
  }
  // @Input('appHighlight') isItSo: boolean = false;
  @Input()
  set appHighlight(check: boolean) {
    check
      ? this.container.createEmbeddedView(this.templateRef)
      : this.container.clear();
  }

  // ngOnInit(): void {
  //   this.el.nativeElement.style.backgroundColor = '#343434';
  //   this.render.setStyle(this.el.nativeElement, 'backgroundColor', 'green');
  // }
  @HostListener('mouseenter') onMouseEnter() {
    this.highlight('yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.highlight(this.bgc);
  }
  @HostListener('input', ['$event']) onInput() {
    const ipv = event?.target as HTMLInputElement;
    console.log(ipv.value);

    this.el.nativeElement.value.toLocaleUpperCase();
  }
  @HostListener('click', ['$event']) onClick() {
    setTimeout(() => {
      this.el.nativeElement.value =
        this.el.nativeElement.value.toLocaleUpperCase();
    }, 2000);
  }

  // @HostBinding('value') value: string = 'Kem cho majama';
  // @HostBinding('style.backgroundColor') bgc: string = 'pink';

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
