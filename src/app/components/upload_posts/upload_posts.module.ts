import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UploadPostsService } from './upload_posts.service';
import { UploadPostsComponent } from './upload_posts.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const routes = [
    {
        path: '',
        component: UploadPostsComponent
    }
];

@NgModule({
    declarations: [
        UploadPostsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatSnackBarModule,
        MatInputModule,
        MatCardModule,
        FormsModule,
        MatTooltipModule,
        ReactiveFormsModule,
        FlexLayoutModule
    ],

    providers: [UploadPostsService]
})

export class UploadPostsModule { }
