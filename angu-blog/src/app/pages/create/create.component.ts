import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  createForm: FormGroup;
  userId: string | null = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private postService: PostService, private auth: AuthService) {
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^\w+$/)]], // Single word validation
      content: ['', [Validators.required, Validators.minLength(50)]], // Minimum 50 characters
    });

    this.auth.getUser().subscribe((user) => {
      this.userId = user?.uid || null;
    });
  }

  onSubmit(): void {
    if (this.createForm.invalid) {
      this.errorMessage = 'There are empty fields!';
      return;
    }

    const newPost = {
      ...this.createForm.value,
      userId: this.userId,
      createdAt: new Date(),
    };

    this.postService.createPost(newPost).then(() => {
      this.createForm.reset();
      this.errorMessage = ''; // Clear errors on success
    });
  }
}
