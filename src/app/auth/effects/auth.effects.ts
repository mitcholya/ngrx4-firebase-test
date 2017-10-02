import { User } from '../models/user';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/exhaustMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from '../services/auth.service';
import * as Auth from '../actions/auth';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$
    .ofType(Auth.LOGIN)
    .map((action: Auth.Login ) => action.payload)
    .exhaustMap(auth => 
      this.authService
        .login(auth)
        .do((user) => console.log(user))
        //.filter((user) => user != undefined)
        .map(() => new Auth.LoginSuccess())
        .catch(error => of(new Auth.LoginFailure(error)))
    ); 

  @Effect()
  getUser$ = this.actions$
    .ofType(Auth.GET_USER)
    .startWith(new Auth.GetUserAction())
    .switchMap(() =>
        this.afAuth.authState
            .map((user: firebase.User) =>  new Auth.GetUserCompleteAction(this._getUserInfo(user)))
            .catch(error => of(new Auth.GetUserFailAction(error)))
    );
 
  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
    .ofType(Auth.LOGIN_SUCCESS)
    .do(() => this.router.navigate(['/']));

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType(Auth.LOGIN_REDIRECT, Auth.LOGOUT)
    .do(authed => {
      this.router.navigate(['/login']);
    });

    @Effect({ dispatch: false })
    logout$ = this.actions$
      .ofType(Auth.LOGOUT)
      .map((action: Auth.Logout ) => action)
      .exhaustMap(auth =>
        this.authService
          .logout()
          //.map(user => new Auth.LoginRedirect())
        .catch(error => of(console.log(error))
        )
      );

    @Effect({dispatch: false})
    updateUserData$ = this.actions$
      .ofType(Auth.UPDATE_USER_DATA)
      .map((action: Auth.UpdateUserData ) => action.payload )
      .map(auth => this.authService.updateUserData(auth))
      .catch(error => of(console.log(error)))

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {} 

  private _getUserInfo(user: firebase.User) {
    if (!user) {
        return {
            displayName: '',
            email: '',
            emailVerified: false,
            isAnonymous: true,
            phoneNumber: '',
            photoURL: '',
            providerId: '',
            uid: ''
        };
    }
    return {
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid
    };
}
} 
