import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampInfoComponent } from './stamp-info.component';

describe('StampInfoComponent', () => {
  let component: StampInfoComponent;
  let fixture: ComponentFixture<StampInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StampInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
