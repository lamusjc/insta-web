import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from './posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
    form: FormGroup;
    data: any;

    constructor(private postsService: PostsService, public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
        this.form = this.formBuilder.group({
            description: ['', Validators.required]
        });
    }
    ngOnInit() {
        this.getPosts();
    }

    getPosts() {
        this.postsService.getPosts().subscribe(res => {
            this.data = res.data;
        }, err => {
            // console.log('Error')
        })
    }

    like(posts) {
        const body = { posts_id: posts.posts_id }
        this.postsService.like(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            this.getPosts();
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        })
    }

    comment(posts) {
        const body = { posts_id: posts.posts_id, description: this.form.get('description').value }
        this.postsService.comment(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            this.getPosts();
            this.form.get('description').setValue('');
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        })
    }

    dislike(posts) {
        const body = { posts_id: posts.posts_id, likes_id: posts.likes_id }
        this.postsService.dislike(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });

            this.getPosts();
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        })
    }

    openComments(comments) {
        const dialogRef = this.dialog.open(CommentsDialog, {
            data: {
                comments: comments
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log(`Dialog result: ${result}`);
        });
    }

    openLikes(likes) {
        const dialogRef = this.dialog.open(LikesDialog, {
            data: {
                likes: likes
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log(`Dialog result: ${result}`);
        });
    }

}

@Component({
    selector: 'comments',
    templateUrl: 'comments.html',
})
export class CommentsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public dialogRef: MatDialogRef<CommentsDialog>) {

    }
    navigate(id) {
        this.router.navigate(['/home/user/' + id]);
        this.dialogRef.close();
    }
}

@Component({
    selector: 'likes',
    templateUrl: 'likes.html',
})
export class LikesDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public router: Router, public dialogRef: MatDialogRef<LikesDialog>) {

    }

    navigate(id) {
        this.router.navigate(['/home/user/' + id]);
        this.dialogRef.close();
    }
}