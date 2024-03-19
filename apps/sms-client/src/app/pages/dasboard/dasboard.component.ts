import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTileComponent } from '../../components/dashboard-tile/dashboard-tile.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { EventTileComponent } from '../../components/event-tile/event-tile.component';
import { TopPerfomerTableComponent } from '../../components/top-perfomer-table/top-perfomer-table.component';
import { ColumnChartComponent } from '../../components/column-chart/column-chart.component';

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
  ],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css',
})
export class DasboardComponent {}
