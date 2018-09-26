import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  redirectUrl: string;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = this.firebaseAuth.authState;

    this.user.subscribe(
      user => {
        if (user) {
          this.userDetails = user;
          console.log(this.userDetails);
        }
        else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn(): boolean {
    return this.userDetails === null ? false : true;
  }

  logout() {
    this.firebaseAuth.auth.signOut();
  }
}
