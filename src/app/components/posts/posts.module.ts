import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PostsService } from './posts.service';
import { PostsComponent } from './posts.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';

const routes = [
    {
        path: '',
        component: PostsComponent
    }
];

@NgModule({
    declarations: [
        PostsComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatSnackBarModule,
        MatInputModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatDividerModule,
        MatTooltipModule,
        MatDialogModule
    ],
    providers: [PostsService]
})

export class PostsModule { }
