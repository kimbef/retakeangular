import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).catch((error) => {
      return throwError(() => new Error(this.mapAuthError(error.code)));
    });
  }

  register(email: string, password: string): Promise<any> {
    return this.afAuth.createUserWithEmailAndPassword(email, password).catch((error) => {
      return throwError(() => new Error(this.mapAuthError(error.code)));
    });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }

  getUser() {
    return this.afAuth.authState;
  }

  private mapAuthError(errorCode: string): string {
    const errorMap: Record<string, string> = {
      'auth/email-already-in-use': 'Email is already registered.',
      'auth/user-not-found': 'No user found with this email.',
      'auth/wrong-password': 'Incorrect password.',
      'auth/weak-password': 'Password must be at least 6 characters long.',
    };
    return errorMap[errorCode] || 'An unknown error occurred.';
  }
}
