import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperCreateAccountComponent } from './stepper-create-account.component';

describe('StepperCreateAccountComponent', () => {
  let component: StepperCreateAccountComponent;
  let fixture: ComponentFixture<StepperCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepperCreateAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
