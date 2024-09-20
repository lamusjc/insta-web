import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class UploadPostsService {
    constructor(private httpService: HttpService) { }

    getProfile() {
        return this.httpService.get('info');
    }

    uploadPosts(data){
        return this.httpService.post('post', data);
    }

    logout() {
        return this.httpService.get('logout');
    }

}