import { User } from '../../auth/models/user';
import 'rxjs/add/operator/let';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
// import { Observable } from 'rxjs/Rx';
// import { Store } from '@ngrx/store';
import * as fromAuth from './../../auth/reducers';

import * as fromBooks from '../reducers';
import * as collection from '../actions/collection';
import * as authActions from './../../auth/actions/auth';
import { Book } from '../models/book';
import * as fromRoot from '../reducers'

@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <md-card>
      <md-card-title>My Collection
      </md-card-title>
      <md-card-content>
      <div *ngIf="user$ | async as user">
      {{ user.displayName }} 
      </div>
      <button md-raised-button (click)="updateUserName()">Изменить имя пользователя</button>
      </md-card-content>
    </md-card>

    <bc-book-preview-list [books]="books$ | async"></bc-book-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
    md-card-title {
      display: flex;
      justify-content: center;
    }
  `,
  ],
})
export class CollectionPageComponent implements OnInit {
  books$: Observable<Book[]>;
  user$: Observable<User>;

  constructor(private store: Store<fromBooks.State>,
              private authStore: Store<fromAuth.State>) {
    this.books$ = this.store.select(fromBooks.getBookCollection);
    this.user$ = this.authStore.select(fromAuth.getUser);
    //this.user$ = this.store.select(fromAuth.getUser);

  }

  ngOnInit() {
    this.store.dispatch(new collection.Load());
    console.log(this.user$);
  }

  updateUserName() {
    this.store.dispatch(new authActions.ChangeUserName('Привет Мир!!!'));
  }
}
