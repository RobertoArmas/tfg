import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { map, take, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  redirectUrl: string;
  private _userId: string; // Usar la userid resuelta para evitar ForkJoins
  private profilePicture$: string;

  constructor(private fbsAuth: AngularFireAuth, private router: Router) {
    this.uid.subscribe(
      uid => {
        this._userId = uid;
      }
    );

    // Cuando el usuario logea correctamente redirecciona a la url que quería activar
    this.fbsAuth.auth.onAuthStateChanged(
      user => {
        if (user) {
          this.router.navigate([this.redirectUrl]);
          this._userId = user.uid;
          this.profilePicture$ = user.photoURL;
        }
      }
    );
  }

  get userId() {
    return this._userId;
  }

  get profilePicture() {
    return this.profilePicture$;
  }

  get uid(): Observable<string> {
    return this.fbsAuth.user.pipe(
      take(1),
      map(user => user.uid)
    );
  }

  get name(): Observable<string> {
    return this.fbsAuth.user.pipe(
      take(1),
      map(user => user.displayName)
    );
  }

  checkLogin(): Observable<boolean> {
    return this.fbsAuth.user.pipe(
      map(
        user => {
          if (!user) {
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

  isLoggedIn() {
    return this.fbsAuth.authState.pipe(first());
 }
}
