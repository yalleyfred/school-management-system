import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/shared/alert/alert.component';
import { AlertService } from './services/alert/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, AlertComponent],
  selector: 'sms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private alertService = inject(AlertService);
  public title = 'sms-client';
  public alert = this.alertService.alertdata;
}
