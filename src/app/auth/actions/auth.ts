import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models/user';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';
export const GET_USER = '[Auth] Get User';
export const GET_USER_COMPLETE = '[Auth] Get User Complete';
export const GET_USER_FAIL = '[Auth] Get User Fail';
export const CHANGE_USER_NAME = '[Auth] Change User Name';
export const UPDATE_USER_DATA = '[Auth] Update User Data';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: Authenticate) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor() {}
}

export class LoginFailure implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class LoginRedirect implements Action {
  readonly type = LOGIN_REDIRECT;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class GetUserAction implements Action {
  readonly type = GET_USER;

  constructor( ) {}
}

export class GetUserCompleteAction implements Action {
  readonly type = GET_USER_COMPLETE;
  constructor(public payload: any) { }
}

export class GetUserFailAction implements Action {
  readonly type = GET_USER_FAIL;
  constructor(public payload: any) { }
}

export class ChangeUserName implements Action {
  readonly type = CHANGE_USER_NAME;

  constructor(public payload: string ) {}
}

export class UpdateUserData implements Action {
  readonly type = UPDATE_USER_DATA;
  constructor (public payload: User) {

  }
}

export type Actions =
  | Login
  | LoginSuccess
  | LoginFailure
  | LoginRedirect
  | Logout
  | GetUserAction
  | GetUserCompleteAction
  | GetUserFailAction
  | ChangeUserName
  | UpdateUserData ;
