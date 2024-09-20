import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'

@Injectable({
    providedIn: 'root'
})

export class PostsService {
    constructor(private httpService: HttpService) { }

    getPosts() {
        return this.httpService.get('post');
    }

    logout() {
        return this.httpService.get('logout');
    }

    like(data) {
        return this.httpService.post('like', data);
    }

    comment(data){
        return this.httpService.post('comment', data);
    }

    dislike(data) {
        return this.httpService.post('dislike', data);
    }

}