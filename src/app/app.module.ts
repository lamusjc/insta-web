import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthGuard } from './guards/auth.guard';
import { SessionInterceptor } from './guards/sessions.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentsDialog, LikesDialog } from './components/posts/posts.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FollowsDialog } from './components/user/user.component';

const appRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
      },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./components/register/register.module').then(m => m.RegisterModule),
  },
];


@NgModule({
  declarations: [
    AppComponent,
    CommentsDialog,
    FollowsDialog,
    LikesDialog
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [CommentsDialog, FollowsDialog, LikesDialog]
})
export class AppModule { }
