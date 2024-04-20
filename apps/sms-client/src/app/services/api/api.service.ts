import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILogin,
  LoginRes,
  ISignup,
  SignupRes,
} from '../../store/store.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private API = 'localhost:3000';

  public signup(signupData: ISignup): Observable<SignupRes> {
    return this.http.post<SignupRes>(`${this.API}/signup`, {
      signupData,
    });
  }
  public login(loginData: ILogin): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${this.API}/login`, {
      loginData,
    });
  }
}
