import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDorComponent } from './test-dor.component';

describe('TestDorComponent', () => {
  let component: TestDorComponent;
  let fixture: ComponentFixture<TestDorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestDorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
