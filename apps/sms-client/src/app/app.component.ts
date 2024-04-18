import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/shared/alert/alert.component';

@Component({
  standalone: true,
  imports: [ RouterModule, AlertComponent],
  selector: 'sms-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title = 'sms-client';
}
