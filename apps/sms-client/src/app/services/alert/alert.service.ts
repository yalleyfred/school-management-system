import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AlertData, AlertType } from '../../app.interface';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alert = new Subject<AlertData | null>();
  private alertInfo = this.alert.asObservable();

  get alertdata() {
    return this.alertInfo;
  }
  public triggerAlert(message: string, type: AlertType, duration = 1500): void {
    this.alert.next({ message, type });
    setTimeout(() => {
      this.alert.next(null);
    }, duration);
  }
}
