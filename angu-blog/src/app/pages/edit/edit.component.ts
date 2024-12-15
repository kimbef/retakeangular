import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.postService.getPostById(this.postId).subscribe(post => {
        this.editForm.patchValue(post);
      });
    }
  }

  onSubmit(): void {
    if (this.editForm.valid && this.postId) {
      this.postService.updatePost(this.postId, this.editForm.value).then(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
