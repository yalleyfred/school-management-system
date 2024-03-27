import { Subscription } from 'rxjs';

export class Destroyer {
  public subscriptionDestroyer = new Subscription();

  public addSubscription(subscption: Subscription):void {
    this.subscriptionDestroyer.add(subscption);
  }

  public destroySubscription():void {
    this.subscriptionDestroyer.unsubscribe();
  }
}
