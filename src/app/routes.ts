import { EditProfileComponent } from './auth/components/edit-profile/edit-profile.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './auth/services/auth-guard.service';
import { NotFoundPageComponent } from './core/containers/not-found-page';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    loadChildren: './books/books.module#BooksModule',
    canActivate: [AuthGuard],
  },
  { path: 'edit-profile', component: EditProfileComponent},
  { path: '**', component: NotFoundPageComponent },
];
