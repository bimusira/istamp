import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTempComponent } from './select-temp.component';

describe('SelectTempComponent', () => {
  let component: SelectTempComponent;
  let fixture: ComponentFixture<SelectTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTempComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
