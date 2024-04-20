import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTileComponent } from '../../components/dashboard/dashboard-tile/dashboard-tile.component';
import { CalendarComponent } from '../../components/dashboard/calendar/calendar.component';
import { EventTileComponent } from '../../components/dashboard/event-tile/event-tile.component';
import { TopPerfomerTableComponent } from '../../components/dashboard/top-perfomer-table/top-perfomer-table.component';
import { ColumnChartComponent } from '../../components/dashboard/column-chart/column-chart.component';
import { PieChartComponent } from '../../components/dashboard/pie-chart/pie-chart.component';

@Component({
  selector: 'sms-dasboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTileComponent,
    CalendarComponent,
    EventTileComponent,
    TopPerfomerTableComponent,
    ColumnChartComponent,
    PieChartComponent,
  ],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css',
})
export class DasboardComponent {}
