import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { EnrollmentStore } from '../../store/enrollment.store';
import { LiveSyncService } from '../../services/live-sync.service';
import { AnalyticsChartComponent } from '../../ui/analytics-chart/analytics-chart.component';

@Component({
  selector: 'tms-instructor-dashboard',
  standalone: true,
  imports: [AnalyticsChartComponent],
  templateUrl: './instructor-dashboard.component.html',
  styleUrl: './instructor-dashboard.component.scss'
})
export class InstructorDashboardComponent implements OnInit, OnDestroy {
  store = inject(EnrollmentStore);
  private sync = inject(LiveSyncService);

  ngOnInit() {
    this.store.loadEnrollments();
    this.store.listenForLiveUpdates();
  }

  ngOnDestroy() {
    this.sync.disconnect();
  }
}