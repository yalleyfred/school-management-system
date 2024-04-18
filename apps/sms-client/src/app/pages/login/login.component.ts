import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/shared/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth.slice';

@Component({
  selector: 'sms-login',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private store: Store = inject(Store);
  public loginForm!: FormGroup;
  public isLoginError = false;

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public handleLoginSubmit(): void {
    if (this.loginForm.valid) {
      const login = this.loginForm.value;
      this.store.dispatch(authActions.triggerLogin(login));
    } else {
      this.loginForm.reset();
      this.isLoginError = true;
    }
  }
}
