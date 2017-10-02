import { Store } from '@ngrx/store';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../reducers';
import * as fromAuth from '../../../auth/reducers'
import { FormGroup, FormControl } from '@angular/forms';
import * as Auth  from '../../actions/auth';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<fromRoot.State>) {

    this.user$ = this.store.select(fromAuth.getUser);
   }

  ngOnInit() {
  }

  form: FormGroup = new FormGroup({
    displayName: new FormControl(''),
    city: new FormControl(''),
    phone: new FormControl('')
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      const user = this.form.value;
      this.store.dispatch(new Auth.UpdateUserData(user));
    }
  }


} 
