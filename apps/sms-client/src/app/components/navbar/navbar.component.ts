import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { getCurrentPage } from '../../utils/general';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'sms-navbar',
  standalone: true,
  imports: [CommonModule, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private router = inject(Router);

  public getPageName() {
    return getCurrentPage(this.router.url);
  }
}
