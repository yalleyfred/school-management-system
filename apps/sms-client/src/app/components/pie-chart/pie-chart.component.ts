import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sms-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css',
})
export class PieChartComponent {
  public teachers = 600;
  public students = 700;
  public total = this.teachers+this.students;
}
