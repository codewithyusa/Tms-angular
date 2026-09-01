import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentFormComponent } from './enrollment-form.component';

describe('EnrollmentForm', () => {
  let component: EnrollmentForm;
  let fixture: ComponentFixture<EnrollmentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
