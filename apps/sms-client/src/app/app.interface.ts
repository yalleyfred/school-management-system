export type AlertType = 'error' | 'success';

export interface AlertData {
  message: string;
  type: AlertType;
}
