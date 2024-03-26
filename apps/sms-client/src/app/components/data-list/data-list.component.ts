import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataItemComponent } from '../data-item/data-item.component';
import { Router } from '@angular/router';
import { getCurrentPage } from '../../utils/general';
import { SearchComponent } from '../search/search.component';
import { filter, fromEvent, map } from 'rxjs';
import { Destroyer } from '../../utils/destroyer';

@Component({
  selector: 'sms-data-list',
  standalone: true,
  imports: [CommonModule, DataItemComponent, SearchComponent],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.css',
})
export class DataListComponent extends Destroyer implements OnInit, OnDestroy {
  private router = inject(Router);
  public getPageName() {
    return getCurrentPage(this.router.url);
  }
  public tempArray = [1, 2, 3, 4, 5, 6, 7, 8, 9,10];
  public selectedItem: number | null = null;

  public ngOnInit(): void {
    this.addSubscription(
      fromEvent<KeyboardEvent>(document, 'keydown')
        .pipe(
          map((event) => event.key),
          filter((key) => key === 'ArrowDown' || key === 'ArrowUp'),
        )
        .subscribe({
          next: (key) => {
            key === 'ArrowDown' ? this.moveDown() : this.moveUp();
          },
        }),
    );
  }
  public handleItemClick(item: number): void {
    this.selectedItem = item;
  }

  private moveDown(): void {
    if (this.selectedItem !== this.tempArray.length) {
      this.selectedItem = this.selectedItem ? this.selectedItem + 1 : 1;
    }
  }

  private moveUp(): void {
    if (this.selectedItem !== this.tempArray[0]) {
      this.selectedItem = this.selectedItem
        ? this.selectedItem - 1
        : this.tempArray.length;
    }
  }

  public ngOnDestroy(): void {
    this.destroySubscription();
  }
}
