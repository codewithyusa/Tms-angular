import { Component, computed, input } from '@angular/core';
import { Enrollment } from '../../models/enrollment.model';

@Component({
  selector: 'tms-analytics-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <h3>Enrollment Analytics</h3>
      <div class="bars">
        <div class="bar-group">
          <div class="bar approved" [style.height.px]="approvedHeight()"></div>
          <span>Approved</span>
        </div>
        <div class="bar-group">
          <div class="bar pending" [style.height.px]="pendingHeight()"></div>
          <span>Pending</span>
        </div>
        <div class="bar-group">
          <div class="bar rejected" [style.height.px]="rejectedHeight()"></div>
          <span>Rejected</span>
        </div>
      </div>
      <p>Total records: {{ data().length }}</p>
    </div>
  `,
  styleUrl: './analytics-chart.component.scss',
})
export class AnalyticsChartComponent {
  data = input.required<Enrollment[]>();

  // computed() memoizes the result — the filter only re-runs when data()
  // changes, not on every change detection cycle. This is the signal-first
  // pattern M9 teaches.
  approvedHeight = computed(() => {
    const count = this.data().filter(e => e.status === 'Approved').length;
    return Math.max(20, count * 3);
  });

  pendingHeight = computed(() => {
    const count = this.data().filter(e => e.status === 'Pending').length;
    return Math.max(20, count * 3);
  });

  rejectedHeight = computed(() => {
    const count = this.data().filter(e => e.status === 'Rejected').length;
    return Math.max(20, count * 3);
  });
}