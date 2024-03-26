import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sms-data-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-item.component.html',
  styleUrl: './data-item.component.css',
})
export class DataItemComponent {
 @Input() public isSelected=false
}
