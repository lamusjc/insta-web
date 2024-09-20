import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from './home.service'
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [{
            path: 'posts',
            loadChildren: () => import('../posts/posts.module').then(m => m.PostsModule),
        }, {
            path: 'profile',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
        }, {
            path: 'upload_posts',
            loadChildren: () => import('../upload_posts/upload_posts.module').then(m => m.UploadPostsModule),
        }, {
            path: 'user/:users_id',
            loadChildren: () => import('../user/user.module').then(m => m.UserModule),
        }, {
            path: 'notifications',
            loadChildren: () => import('../notifications/notifications.module').then(m => m.NotificationsModule),
        }]
    },

];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatCardModule,
        MatIconModule,
        FlexLayoutModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [HomeService]
})

export class HomeModule { }
