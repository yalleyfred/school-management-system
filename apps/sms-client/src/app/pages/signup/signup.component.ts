import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/auth.slice';
import { ISignup } from '../../store/store.interface';

@Component({
  selector: 'sms-signup',
  standalone: true,
  imports: [CommonModule, InputComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  private formBuilder: FormBuilder = inject(FormBuilder);
  private store: Store = inject(Store);
  public signupForm!: FormGroup;
  public isSignupError = false;

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
      const signup: ISignup = this.signupForm.value;
      this.store.dispatch(
        authActions.triggerSignup({
          signup,
        }),
      );
    } else {
      this.isSignupError = true;
    }
  }
}
