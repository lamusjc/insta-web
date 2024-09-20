import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    constructor(private httpService: HttpService) { }

    getProfile() {
        return this.httpService.get('info');
    }

    logout() {
        return this.httpService.get('logout');
    }

    getAllUsers(){
        return this.httpService.get('user');
    }

}