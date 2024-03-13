import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sms-calendar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  public viewDate: Date = new Date();
  public holidays: Date[] = [new Date('2024-01-01'), new Date('2024-12-25')];

  public dayClicked(day: Date): void {
    console.log('Clicked on: ', day);
  }

}
