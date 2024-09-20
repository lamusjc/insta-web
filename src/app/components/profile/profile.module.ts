import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

const routes = [
    {
        path: '',
        component: ProfileComponent
    }
];

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
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
        MatTooltipModule
    ],
    providers: [ProfileService]
})
export class ProfileModule {

}