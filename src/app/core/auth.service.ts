import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(private fbsAuth: AngularFireAuth) { }

  get uid(): Observable<string> {
    return this.fbsAuth.user.pipe(
      map(user => {return user.uid})
    );
  }

  signInWithGoogle() {
    return this.fbsAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  // FIXME: No funciona
  isLoggedIn(): boolean {
    return true;
    // return this.userDetails === null ? false : true;
  }

  logout() {
    this.fbsAuth.auth.signOut();
  }
}
