import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  posts: any[] = [];
  userId: string | null = null;
userPosts: any;
deletePost: any;

  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe((user) => {
      this.userId = user?.uid || null; // Safely access the UID
      if (this.userId) {
        this.loadPosts();
      }
    });
  }

  loadPosts(): void {
    this.postService.getPosts().subscribe((posts) => {
      this.posts = posts.filter((post) => post.userId === this.userId);
    });
  }
}
