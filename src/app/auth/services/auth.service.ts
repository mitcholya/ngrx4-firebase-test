import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { User, Authenticate } from '../models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class AuthService {

  authState: any = null;
  user: any;

  constructor(
    public afAuth: AngularFireAuth,
    private router:Router,
  ) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  login({ username, password }: Authenticate) {
    /**
     * Simulate a failed login to display the error
     * message for the login form.
     */
    // if (username !== 'test') {
    //   return _throw('Invalid username or password');
    // }

    
   
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.signInWithEmailAndPassword(username, password)
    ); 
    // .then((user) => {
    //   this.authState = user;
    //   this.user = user;
     // this.loadUser(user);
      // this.updateUserData();
     // this.saveToken({city: "Гай"}); 
     // this.onLogedIn(user);
      
    // })
    // .catch(error => {
    //   console.log(error);
    //   alert("Email или пароль указаны не верно");
    //      });

   
  }

  logout() {
    
    return this.fromFirebaseAuthPromise(
      this.afAuth.auth.signOut()
    );
  }

  public onLogedIn( res ){
    console.log('user logged in', res );
    //this.router.navigate(['/']);
  }

  public loadUser (user) {
    console.log(this.currentUserId);
    return of(user);
  }

  public updateUserData(user: User): Observable<User> {
    // Writes user name and email to realtime db
    // useful if your app displays information about users or for admin features
      // console.log(this.authState);
      const userData = {
        displayName:user.displayName,
        photoURL:user.photoURL
      }

      return this.fromFirebaseAuthPromise(
        this.afAuth.auth.currentUser.updateProfile(userData)
      );
     
      // this.authState.updateProfile({
      //   displayName: user.displayName,
      //   email: user.email,
      //   phoneNumber: user.phoneNumber
      // });
      // let path = `users/${this.currentUserId}`; // Endpoint on firebase
      // let data = {
      //               email: this.authState.email,
      //               name: name
      //             };
  
    }

      // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

      // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

    // Returns
    get currentUserObservable(): any {
      return this.afAuth.authState
    }

    private fromFirebaseAuthPromise(promise): Observable<any> {
      return Observable.fromPromise(<Promise<any>>promise);
    }
}
