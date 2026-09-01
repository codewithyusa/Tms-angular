import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorDashboardComponent } from './instructor-dashboard.component';

describe('InstructorDashboard', () => {
  let component: InstructorDashboard;
  let fixture: ComponentFixture<InstructorDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(InstructorDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
