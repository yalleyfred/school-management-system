import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'sms-column-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './column-chart.component.html',
  styleUrl: './column-chart.component.css',
})
export class ColumnChartComponent {}
