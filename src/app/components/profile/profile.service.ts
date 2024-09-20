import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class ProfileService {
    constructor(private httpService: HttpService) { }

    getProfile() {
        return this.httpService.get('info');
    }

    updateUser(data){
        return this.httpService.put('update', data);
    }

}