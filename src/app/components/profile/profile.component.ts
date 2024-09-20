import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from './profile.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
    uploadResponse: any = { status: '', message: '', filePath: '' };
    form: FormGroup;
    data: any = {
        user: {}
    };
    constructor(private formBuilder: FormBuilder, private profileService: ProfileService, private snackBar: MatSnackBar, private router: Router) {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            lastname: ['', Validators.required],
            description: ['', Validators.nullValidator],
            isprivate: [false],
            file: ['']
        })
    }

    ngOnInit() {
        this.getProfile();

    }

    getProfile() {
        this.profileService.getProfile().subscribe(res => {
            this.data.user = res.data;

            this.form.patchValue({
                name: this.data.user.name,
                lastname: this.data.user.lastname,
                description: this.data.user.description,
                isprivate: this.data.user.private,
                file: this.data.user.users_photo
            })
        });
    }

    update() {
        this.snackBar.open('Loading!', 'Info', {
            duration: 999999,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
        const body = {
            name: this.form.get('name').value,
            lastname: this.form.get('lastname').value,
            description: this.form.get('description').value,
            isprivate: this.form.get('isprivate').value,
            file: this.form.get('file').value
        }
        this.profileService.updateUser(this.form.value).subscribe(res => {
            this.snackBar.open(res.message, 'OK', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            window.location.reload();
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }

    onFileChange(event) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            reader.readAsDataURL(file);
            let ext = file.name.split('.');
            let type = file.type.split('/');
            if (ext.length > 1) {
                if (type[0] == 'image') {
                    reader.onload = () => {
                        this.snackBar.open('Readed Image! Ready for post', 'SUCCESS', {
                            duration: 3000,
                            horizontalPosition: 'center',
                            verticalPosition: 'top'
                        });
                        this.form.get('file').setValue(reader.result);
                    }
                } else {
                    alert('Solo imagenes');
                }
            } else {
                alert('No tiene extension');
            }

            reader.onloadstart = () => {
                this.snackBar.open('Reading', 'SUCCESS', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }

            reader.onerror = () => {
                this.snackBar.open('ERROR', 'SUCCESS', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            }
        }
    }
}