import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'sms-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  isGreaterThanHalf = true;

  total= 500
  teachers= 200
  students=300
}
