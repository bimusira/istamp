import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampPrintComponent } from './stamp-print.component';

describe('StampPrintComponent', () => {
  let component: StampPrintComponent;
  let fixture: ComponentFixture<StampPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StampPrintComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
