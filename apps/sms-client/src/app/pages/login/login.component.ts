import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'school-management-system-login',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public isLoginError = false;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public handleLoginSubmit(): void {
    if (this.loginForm.valid) {
      alert('Login successful');
      this.router.navigateByUrl('/dashboard');
    } else {
      this.loginForm.reset();
      this.isLoginError = true;
    }
  }
}
