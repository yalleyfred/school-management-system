import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertType } from '../../../app.interface';

@Component({
  selector: 'sms-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Input() public message = 'Test message';
  @Input() public type: AlertType = 'error';
}
