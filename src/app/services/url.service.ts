import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UrlService {
    public url = 'https://instaapi-lamus.herokuapp.com/';

    constructor() {

    }

    getUrl() {
        return this.url;
    }

}
