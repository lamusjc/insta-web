import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    public isAuthenticated = false;
    constructor(private httpService: HttpService) { }

    authenticate(data) {
        return this.httpService.post('login', data);
    }

}