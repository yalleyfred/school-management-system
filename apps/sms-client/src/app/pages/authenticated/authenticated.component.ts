import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'sms-authenticated',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, NavbarComponent],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.css',
})
export class AuthenticatedComponent {}
