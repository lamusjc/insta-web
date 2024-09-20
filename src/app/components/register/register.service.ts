import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    constructor(private httpService: HttpService) {}

    register(data){
        return this.httpService.post('register', data);
    }
    
}