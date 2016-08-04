import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';
import { User } from '../';
import { RepositoryService } from './repository.service';

const EmailPasswordConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@Injectable()
export class AuthService {
  get loggedIn(): boolean {
    return !!this.userSnapshot;
  }

  get verified(): boolean {
    return this.loggedIn && firebase.auth().currentUser.emailVerified;
  }

  private _user = new BehaviorSubject<User>(null);
  get user(): Observable<User> {
    return this._user.asObservable();
  }
  get userSnapshot(): User {
    return this._user.value;
  }

  /**
   * Listen for changes in auth state.
   */
  get auth(): Observable<FirebaseAuthState> {
    return this.af.auth;
  }

  constructor(
      private af: AngularFire,
      private repoService: RepositoryService) {
    af.auth.subscribe(
        auth => {
          if (auth) {
            repoService.getUser(auth.uid).subscribe(
                user => this._user.next(user));
          } else {
            this._user.next(null);
          }
        });
  }

  /**
   * Resolves with the `uid` of the created user.
   */
  registerNewUser(user: User, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // First create the user in auth
      this.af.auth.createUser({ email: user.email, password: password }).then(
          authState => {
            // Send email verification
            this.sendVerificationEmail();
            // If that succeeded, create the user in the database
            let uid = authState.uid;
            this.af.database.object(`/users/${uid}`).set(user).then(
                () => resolve(),
                err => reject(err));
          },
          err => reject(err));
    });
  }

  sendVerificationEmail(): Promise<void> {
    let currentUser = firebase.auth().currentUser;
    return currentUser
        ? currentUser.sendEmailVerification()
        : Promise.resolve();
  }

  /**
   * Requires that a user be logged in.
   */
  verifyEmail(oobCode): Promise<void> {
    // TODO: Once verified, send a request to move this user's successful submissions to the
    // successfulSubmissions area
    return firebase.auth().applyActionCode(oobCode);
  }

  logInWithEmailPassword(email: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.af.auth.login({ email, password }, EmailPasswordConfig).then(
          auth => resolve(),
          err => reject(err));
    });
  }

  logInWithFacebook(): void { }

  logInWithGoogle(): void { }

  logInWithGithub(): void { }

  logOut(): void {
    this.af.auth.logout();
  }
}