import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  displayName: string;
  email: string;
  photoURL: string;

  constructor(public afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
    afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        this.displayName = user.displayName;
        this.email = user.email;
        this.photoURL = user.photoURL;
      }
    });
  }

  emailCreateUser(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  emailSignIn(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  sendPasswordResetEmail(email: string): Promise<void> {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  confirmPasswordResetEmail(code: string, newPassword: string): Promise<void> {
    return this.afAuth.confirmPasswordReset(code, newPassword);
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}
