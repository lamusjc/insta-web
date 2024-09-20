import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private snackBar: MatSnackBar, private router: Router) {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    ngOnInit() {

    }

    register() {
        this.snackBar.open('Loding!', 'Info', {
            duration: 999999,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
        this.registerService.register(this.form.value).subscribe(res => {
            this.snackBar.open(res.message, 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            this.router.navigate(['/login']);
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }
}