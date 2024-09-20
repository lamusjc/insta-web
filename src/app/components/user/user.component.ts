import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute, Event } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './user.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LikesDialog, CommentsDialog } from '../posts/posts.component';
import { PostsService } from '../posts/posts.service';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
    uploadResponse: any = { status: '', message: '', filePath: '' };
    form: FormGroup;
    data: any = {
        user: undefined,
        info: []
    };
    constructor(private formBuilder: FormBuilder, public postsService: PostsService, public dialog: MatDialog, private userService: UserService, private snackBar: MatSnackBar, private router: Router, private snap: ActivatedRoute) {
        this.form = this.formBuilder.group({
            description: [''],
        })

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    ngOnInit() {

        const users_id = this.snap.snapshot.paramMap.get('users_id');
        this.getProfile();
        this.getUser(users_id);
    }

    getUser(users_id) {

        this.userService.getUser(users_id).subscribe(res => {
            this.data.user = res.data;
        });
    }

    getProfile() {
        this.userService.getProfile().subscribe(res => {
            this.data.info = res.data;
        });
    }

    follow(user) {
        const body = { followed: user.users_id, accepted: user.users_private ? false : true };
        this.userService.follow(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }

    unfollow(user) {
        const body = { followed: user.users_id };
        this.userService.unfollow(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }

    deletePost(post) {
        const body = { posts_id: post.posts_id };
        this.userService.deletePost(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }

    hidePost(post) {
        const body = { posts_id: post.posts_id };
        this.userService.hidePost(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }

    unhidePost(post) {
        const body = { posts_id: post.posts_id };
        this.userService.unhidePost(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
        }, err => {
            this.snackBar.open(err.error.message, 'ERROR', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
        });
    }

    openFollows(follow, title) {
        const dialogRef = this.dialog.open(FollowsDialog, {
            data: {
                follow: follow,
                title: title
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
        });
    }

    like(posts) {
        const body = { posts_id: posts.posts_id }
        this.postsService.like(body).subscribe(res => {
            this.snackBar.open(res.message, 'SUCCESS', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
            });
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
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
            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
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

            const users_id = this.snap.snapshot.paramMap.get('users_id');
            this.getUser(users_id);
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
    selector: 'follows',
    templateUrl: 'follows.html',
})
export class FollowsDialog {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private router: Router, public dialogRef: MatDialogRef<FollowsDialog>) {

    }

    navigate(id) {
        this.router.navigate(['/home/user/' + id]);
        this.dialogRef.close();
    }
}