import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type GridDates = Date | null;

@Component({
  selector: 'sms-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  public currentDate: Date = new Date();
  public holidays: Date[] = [new Date('2024-01-01'), new Date('2024-12-25')];
  public grid!: GridDates[][];

  public dayClicked(day: Date): void {
    console.log('Clicked on: ', day);
  }
  public month = 'current month';
  public days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  public months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  ngOnInit(): void {
    const [year, month] = [
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
    ];
    this.grid = this.generateCalendarGrid(year, month);
  }

  generateCalendarGrid(year: number, month: number): GridDates[][] {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const numDays = endDate.getDate();
    const startDayOfWeek = startDate.getDay();

    const grid: GridDates[][] = [[]];
    let currentWeek = 0;
    for (let i = 1; i <= startDayOfWeek; i++) {
      grid[0].push(null);
    }

    for (let i = 1; i <= numDays; i++) {
      const currentDate = new Date(year, month, i);
      if (currentDate.getDay() === 0 && i !== 1) {
        currentWeek++;
        grid.push([]);
      }
      grid[currentWeek].push(currentDate);
    }
    console.log(grid);

    return grid;
  }
}
