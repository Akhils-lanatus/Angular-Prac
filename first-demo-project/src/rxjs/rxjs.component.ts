import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-rxjs',
  standalone: true,
  imports: [LoadingBarModule],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css',
})
export class RxjsComponent implements AfterViewInit, OnDestroy {
  httpClient: HttpClient = inject(HttpClient);
  loadingService: LoadingBarService = inject(LoadingBarService);
  @ViewChild('input') input!: ElementRef<HTMLInputElement>;
  searchQry: string = '';
  private sub: Subscription = new Subscription();
  data: any = null;
  ngAfterViewInit(): void {
    this.sub.add(
      fromEvent(this.input.nativeElement, 'input')
        .pipe(
          tap(() => this.loadingService.start()),
          map((x) => (x.target as HTMLInputElement).value),
          debounceTime(1000),
          distinctUntilChanged(),
          switchMap((query) => {
            return this.httpClient.get(
              `https://my-json-server.typicode.com/Uxtrendz/apis/videoList?q=${query}`
            );
          }),
          tap(() => this.loadingService.stop())
        )
        .subscribe((x) => (this.data = x))
    );
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
