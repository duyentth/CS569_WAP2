import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment as env } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  
  state = signal<IState>(initial_state_value);

  /////signin
  signin(data: { email: string; password: string }) {
    return this.http.post<IResponse<string>>(
      `${env.SERVER_URL}users/signin`,
      data
    );
  }

  ////sign up
  signup(data: IUser) {
    return this.http.post<IResponse<IUser>>(
      `${env.SERVER_URL}users/signup`,
      data
    );
  }

  //get all users
  getUsers() {
    return this.http.get<IResponse<IUser[]>>(`${env.SERVER_URL}users`);
  }
}

export interface IUser {
   _id: string,
  fullname: string;
  email: string;
  password: string;
}

export interface IMember{
  user_id: string,
  fullname: string,
  email: string,
  pending: boolean,
  _id: string
}

export interface IResponse<T = unknown> {
  success: true;
  data: T;
}

export interface IToken {
  _id: string;
  fullname: string;
  email: string;
}

export interface IState {
  _id: string;
  fullname: string;
  email: string;
  jwt: string;
}

export const initial_state_value = {
  _id: '',
  fullname: '',
  email: '',
  jwt: '',
  
};
