import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from '../../components/data-list/data-list.component';

@Component({
  selector: 'sms-student',
  standalone: true,
  imports: [CommonModule, DataListComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {}
