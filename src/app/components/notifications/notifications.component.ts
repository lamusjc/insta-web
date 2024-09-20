import { Component, OnInit } from '@angular/core';
import { NotificationsService } from './notifications.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    data: any = [];
    constructor(private notificationsService: NotificationsService, private router: Router, private formBuilder: FormBuilder) {
       
    }
    ngOnInit() {
        this.getNotifications();
    }

    getNotifications() {
        this.notificationsService.getNotifications().subscribe(res => {
            this.data = res.data;
        });
    }

}