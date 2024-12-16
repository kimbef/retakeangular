import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  createForm: FormGroup;
  userId: string | null = null;

  constructor(private fb: FormBuilder, private postService: PostService, private auth: AuthService) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });

    this.auth.getUser().subscribe((user) => {
      this.userId = user?.uid || null; // Safely access the UID
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid || !this.userId) {
      return;
    }

    const newPost = {
      ...this.createForm.value,
      userId: this.userId,
      createdAt: new Date(),
    };

    this.postService.createPost(newPost).then(() => {
      this.createForm.reset();
    });
  }
}

