import { inject } from '@angular/core';
import { createAction, createReducer, on, props } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../services/api/api.service';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { IAuth, ILogin, ISignup } from './store.interface';
import { initailState } from './store.state';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert/alert.service';

const TRIGGER_SIGNUP = '[SIGNUP] trigger signup';
const TRIGGER_LOGIN = '[LOGIN] trigger login';
const SAVE_AUTH = '[LOGIN] save auth';

export const authActions = {
  triggerSignup: createAction(TRIGGER_SIGNUP, props<{ signup: ISignup }>()),
  triggerLogin: createAction(TRIGGER_LOGIN, props<{ login: ILogin }>()),
  triggerSaveAuth: createAction(SAVE_AUTH, props<{ auth: IAuth }>()),
};

export const authReducer = createReducer(
  initailState.auth,
  on(authActions.triggerSaveAuth, (_, loginData) => loginData.auth),
);

export class AuthEffects {
  private apiService = inject(ApiService);
  private actions = inject(Actions);
  private router = inject(Router);
  private alert = inject(AlertService);

  public triggerSignup = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.triggerSignup),
      exhaustMap((signupData) =>
        this.apiService.signup(signupData.signup).pipe(
          tap(() => {
            this.alert.triggerAlert('Account created', 'success');
            this.router.navigateByUrl('/dashboard');
          }),
          catchError((error) => {
            this.alert.triggerAlert('Sign up failed', 'error');
            return of(error);
          }),
        ),
      ),
    ),
  );

  public triggerLogin = createEffect(() =>
    this.actions.pipe(
      ofType(authActions.triggerLogin),
      exhaustMap((loginData) =>
        this.apiService.login(loginData.login).pipe(
          map((res) => {
            this.router.navigateByUrl('/dashboard');
            return authActions.triggerSaveAuth({ auth: res.data });
          }),
          catchError((error) => {
            this.alert.triggerAlert('Login failed', 'error');
            return of(error);
          }),
        ),
      ),
    ),
  );
}
