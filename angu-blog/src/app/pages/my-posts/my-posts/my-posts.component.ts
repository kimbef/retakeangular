import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css'],
})
export class MyPostsComponent implements OnInit {
  posts: Post[] = []; // Ensure this is declared
  userId: string | null = null;

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      this.userId = user?.uid || null;
      if (this.userId) {
        this.loadMyPosts();
      }
    });
  }

  loadMyPosts(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.filter((post) => post.userId === this.userId); // Filter by user ID
    });
  }
}
