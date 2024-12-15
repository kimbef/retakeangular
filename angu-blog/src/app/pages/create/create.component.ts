import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
})
export class CreateComponent {
  createForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private auth: AuthService,
    private router: Router
  ) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.auth.getUser().subscribe(user => {
      if (user && this.createForm.valid) {
        const postData = {
          ...this.createForm.value,
          userId: user.uid,
          createdAt: new Date(),
        };
        this.postService.createPost(postData).then(() => this.router.navigate(['/dashboard']));
      }
    });
  }
}
