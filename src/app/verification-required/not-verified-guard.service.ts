import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { AuthService } from '../shared';

/**
 * Only allows those WITHOUT a verified email to pass.
 * Those with a verified email are taken to the homepage.
 */
@Injectable()
export class NotVerifiedGuard implements CanActivate {
  constructor(
      private router: Router,
      private authService: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.authService.verified.map(verified => {
      if (verified) {
        this.router.navigateByUrl('/');
      }
      return !verified;
    }).take(1); // Observable needs to complete
  }
}