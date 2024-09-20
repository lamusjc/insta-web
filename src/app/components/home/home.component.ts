import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    data: any = {
        username: '',
        users_id: '',
        name: '',
        lastname: '',
        users_photo: null
    };

    users = [];

    form: FormGroup;
    filteredOptions: Observable<string[]>;
    options: any = [];
    constructor(private homeService: HomeService, private router: Router, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            myControl: new FormControl()
        });
    }
    ngOnInit() {
        this.getProfile();
        this.getAllUsers();
    }

    getAllUsers() {
        this.homeService.getAllUsers().subscribe(res => {
            this.options = res.data;
            this.users = res.data;

            this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        });
    }

    getProfile() {
        this.homeService.getProfile().subscribe(res => {
            this.data = res.data;
        });
    }

    logout() {
        this.homeService.logout().subscribe(res => this.router.navigate(['login']), err => this.router.navigate(['login']));
    }

    navigate(id) {
        this.router.navigate(['/home/user/' + id]);
    }

    navigateThis(user): any {
        let flag = false;
        this.users.map((value, i) => {
            if (value.users_username == user && flag == false) {
                flag = true;
                this.router.navigate(['/home/user/' + value.users_id]);
            }
        });
    }


    private _filter(value: any): any {
        const filterValue = value.toLowerCase();
        return this.options.filter((option: any) => option.users_username.toLowerCase().indexOf(filterValue) !== -1);
    }
}