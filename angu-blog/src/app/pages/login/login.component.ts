import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Fill all required fields!';
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth
      .login(email, password)
      .then(() => {
        this.errorMessage = ''; // Clear any previous errors
        this.router.navigate(['/dashboard']);
      })
      .catch(() => {
        this.errorMessage = 'You have entered invalid username or password';
      });
  }
}
