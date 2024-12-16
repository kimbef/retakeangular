import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  user: any = null; // Stores user details
  errorMessage: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe(
      (user) => {
        if (user) {
          this.user = {
            email: user.email,
            uid: user.uid,
          };
        } else {
          this.errorMessage = 'No user data available.';
        }
      },
      () => {
        this.errorMessage = 'Failed to load user information.';
      }
    );
  }
}
