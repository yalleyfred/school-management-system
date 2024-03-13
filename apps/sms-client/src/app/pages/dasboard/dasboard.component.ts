import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardTileComponent } from '../../components/dashboard-tile/dashboard-tile.component';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { EventTileComponent } from '../../components/event-tile/event-tile.component';

@Component({
  selector: 'sms-dasboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardTileComponent,
    CalendarComponent,
    EventTileComponent
  ],
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.css',
})
export class DasboardComponent {}
