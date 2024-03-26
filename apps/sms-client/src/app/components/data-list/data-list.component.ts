import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataItemComponent } from '../data-item/data-item.component';

@Component({
  selector: 'sms-data-list',
  standalone: true,
  imports: [CommonModule, DataItemComponent],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css',
})
export class DataListComponent {}
