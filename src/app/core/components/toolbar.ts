import { Store } from '@ngrx/store';
import { User } from '../../auth/models/user';
import { Observable } from 'rxjs/Rx';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import * as fromAuth from '../../auth/reducers'


@Component({
  selector: 'bc-toolbar',
  template: `
    <md-toolbar color="primary">
      <button md-icon-button (click)="openMenu.emit()">
        <md-icon>menu</md-icon>
      </button>
      <ng-content>

      </ng-content>
      <div *ngIf="user$ | async as user" class="toolbar-name">
        <a [routerLink] = "['/edit-profile']" class="toolbar-ref">{{ user.displayName }} </a>
      </div>
    </md-toolbar>
  `,
})
export class ToolbarComponent implements OnInit {
  @Output() openMenu = new EventEmitter();
  user$: Observable<User>;


  constructor(
    private store: Store<fromAuth.State>
  ) {
    this.user$ = this.store.select(fromAuth.getUser);
  }

  ngOnInit() {

  }
}
