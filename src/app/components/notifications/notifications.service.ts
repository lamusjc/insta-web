import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class NotificationsService {
    constructor(private httpService: HttpService) { }

    getNotifications() {
        return this.httpService.get('notifications');
    }


}