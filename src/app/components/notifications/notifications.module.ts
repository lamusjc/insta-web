import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationsComponent } from './notifications.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationsService } from './notifications.service';

const routes: Routes = [
    {
        path: '',
        component: NotificationsComponent,
    },

];

@NgModule({
    declarations: [
        NotificationsComponent
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
    providers: [NotificationsService]
})

export class NotificationsModule { }
