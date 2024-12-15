import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.getUser().subscribe(user => {
      this.isLoggedIn = !!user; // Check if user is logged in
    });
  }

  logout(): void {
    this.auth.logout().then(() => {
      this.isLoggedIn = false; // Update the UI
    });
  }
}
