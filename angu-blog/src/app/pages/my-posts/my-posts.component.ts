import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent implements OnInit {
  posts: any[] = []; // Stores posts by the user
  userId: string | null = null;
  errorMessage: string = '';

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user) => {
        this.userId = user?.uid || null;
        if (this.userId) {
          this.loadMyPosts();
        } else {
          this.errorMessage = 'User not logged in.';
        }
      },
      () => {
        this.errorMessage = 'Failed to retrieve user information.';
      }
    );
  }

  loadMyPosts(): void {
    this.postService.getPosts().subscribe(
      (posts) => {
        this.posts = posts.filter((post) => post.userId === this.userId);
      },
      () => {
        this.errorMessage = 'Failed to load posts.';
      }
    );
  }
}
