import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as Auth from '../actions/auth';
import * as fromAuth from '../reducers';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>,
              private authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUserObservable
      .map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LoginRedirect());
          return false;
        }
          // this.store.dispatch(new Auth.LoginSuccess())
        return true;
      })
      .take(1);
  }
}
