import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  userPosts: any[] = [];
  userId: string | null = null;

  constructor(private postService: PostService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.loadUserPosts();
      }
    });
  }

  loadUserPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.userPosts = posts.filter(post => post.userId === this.userId);
    });
  }

  deletePost(id: string): void {
    this.postService.deletePost(id).then(() => {
      this.userPosts = this.userPosts.filter(post => post.id !== id);
    });
  }
}
