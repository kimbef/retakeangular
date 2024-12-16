import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    const { email, password } = this.registerForm.value;

    this.auth
      .register(email, password)
      .then(() => {
        this.errorMessage = ''; // Clear the error on success
        this.router.navigate(['/dashboard']);
      })
      .catch((error: string) => {
        this.errorMessage = error; // Show the error from AuthService
      });
  }
}
