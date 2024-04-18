import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

type GridDates = Date | null;
type Grid<T> = T[][];

@Component({
  selector: 'sms-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  public currentDate: Date = new Date();
  public selectedYear = this.currentDate.getFullYear();
  public selectedMonth = this.currentDate.getMonth();
  public holidays: Date[] = [new Date('2024-01-01'), new Date('2024-12-25')];
  public grid!: Grid<GridDates>;
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

  public ngOnInit(): void {
    this.grid = this.generateCalendarGrid(
      this.selectedYear,
      this.selectedMonth,
    );
  }

  private generateCalendarGrid(year: number, month: number): Grid<GridDates> {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const numDays = endDate.getDate();
    const startDayOfWeek = startDate.getDay();

    const grid: Grid<GridDates> = [[]];
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
    return grid;
  }

  public prevMonth(): void {
    if (this.selectedMonth === 0) {
      this.selectedYear -= 1;
      this.selectedMonth = 11;
    } else {
      this.selectedMonth -= 1;
    }
    this.grid = this.generateCalendarGrid(
      this.selectedYear,
      this.selectedMonth,
    );
  }

  public nextMonth(): void {
    if (this.selectedMonth === 11) {
      this.selectedYear += 1;
      this.selectedMonth = 0;
    } else {
      this.selectedMonth += 1;
    }
    this.grid = this.generateCalendarGrid(
      this.selectedYear,
      this.selectedMonth,
    );
  }

  public isCurrentDate(day: GridDates): boolean {
    return (
      this.currentDate.getDate() === day?.getDate() &&
      this.currentDate.getMonth() === day?.getMonth() &&
      this.currentDate.getFullYear() === day?.getFullYear()
    );
  }
}
