import { Subscription } from 'rxjs';

export class Destroyer {
  public subscriptionDestroyer = new Subscription();

  public addSubscription(subscption: Subscription) {
    this.subscriptionDestroyer.add(subscption);
  }

  public destroySubscription() {
    this.subscriptionDestroyer.unsubscribe();
  }
}
