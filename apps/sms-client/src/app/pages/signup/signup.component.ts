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
  selector: 'sms-signup',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  public isSignupError = false;
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  public ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public handleSignupSubmit(): void {
    if (this.signupForm.valid) {
      this.router.navigateByUrl('/login');
    } else {
      this.isSignupError = true;
    }
  }
}
