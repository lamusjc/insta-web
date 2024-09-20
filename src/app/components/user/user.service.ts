import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class UserService {
    constructor(private httpService: HttpService) { }

    getProfile() {
        return this.httpService.get('info');
    }

    getUser(data) {
        return this.httpService.get('user/' + data);
    }

    follow(data) {
        return this.httpService.post('follow', data);
    }

    unfollow(data) {
        return this.httpService.post('unfollow', data);
    }

    deletePost(data){
        return this.httpService.post('delete_post', data);
    }

    hidePost(data){
        return this.httpService.post('hide_post', data);
    }

    unhidePost(data){
        return this.httpService.post('unhide_post', data);
    }

    updateUser(data) {
        return this.httpService.put('update', data);
    }

}