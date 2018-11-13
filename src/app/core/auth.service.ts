import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  redirectUrl: string;

  constructor(private fbsAuth: AngularFireAuth, private router: Router) {

    // Cuando el usuario logea correctamente redirecciona a la url que quería activar
    this.fbsAuth.auth.onAuthStateChanged(
      user => {
        if(user) {
          this.router.navigate([this.redirectUrl]);
        }
      }
    );
  }

  get uid(): Observable<string> {
    return this.fbsAuth.user.pipe(
      map(user => {return user.uid})
    );
  }

  checkLogin(): Observable<boolean> {
    return this.fbsAuth.user.pipe(
      map(
        user => {
          if(!user) {
            this.fbsAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
            return false;
          } else {
            return true;
          }
        }
      )
    );
  }

  logout() {
    this.fbsAuth.auth.signOut();
  }
}
