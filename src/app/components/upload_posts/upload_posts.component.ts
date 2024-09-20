import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadPostsService } from './upload_posts.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'upload_posts',
    templateUrl: './upload_posts.component.html',
    styleUrls: ['./upload_posts.component.scss']
})
export class UploadPostsComponent implements OnInit {
    form: FormGroup;
    uploadResponse: any = { status: '', message: '', filePath: '' };
    constructor(private uploadPostsService: UploadPostsService, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
        this.form = this.formBuilder.group({
            description: ['', Validators.required],
            file: ['', Validators.required]
        });
    }
    ngOnInit() {
       
    }

    sendFiles() {

        const body = {
            file: this.form.get('file').value,
            description: this.form.get('description').value
        }
        this.uploadPostsService.uploadPosts(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });

            this.router.navigate(['/home/posts']);
        }, err => {
            this.snackBar.open(err.error.message, 'SUCCESS', {
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