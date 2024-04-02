import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataListComponent } from '../../components/data-list/data-list.component';
import { DetailComponent } from '../../components/detail/detail.component';

@Component({
  selector: 'sms-student',
  standalone: true,
  imports: [CommonModule, DataListComponent, DetailComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {}
