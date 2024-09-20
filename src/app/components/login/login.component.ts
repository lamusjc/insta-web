import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private snackBar: MatSnackBar, private router: Router) {
        this.form = this.formBuilder.group({
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    ngOnInit() {
      
    }

    login() {
        this.snackBar.open('Loding!', 'Info', {
            duration: 999999,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
        this.loginService.authenticate(this.form.value).subscribe(res => {
            this.snackBar.open(res.message, 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            this.router.navigate(['/home/posts']);
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }
}