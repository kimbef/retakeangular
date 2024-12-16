import { Component } from '@angular/core';
import { Observable, switchMap, map, of } from 'rxjs';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent {
  filteredPosts$: Observable<any[]>; // Observable for filtered posts

  constructor(private postService: PostService, private authService: AuthService) {
    // Combine the user and posts observables
    this.filteredPosts$ = this.authService.getUser().pipe(
      switchMap((user) => {
        if (user) {
          // Fetch posts and filter them based on the userId
          return this.postService.getPosts().pipe(
            map((posts) => posts.filter((post) => post.userId === user.uid))
          );
        } else {
          // Return an empty array if no user is logged in
          return of([]);
        }
      })
    );
  }
}

