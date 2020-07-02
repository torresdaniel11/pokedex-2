import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';

import { AuthService } from '@services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Return (Observable) TRUE is the user is Authenticated
   * otherwise redirect user to signin screen
   *
   * @param {ActivatedRouteSnapshot} next
   * @param {RouterStateSnapshot} state
   * @returns {Observable<boolean>}
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.afAuth.authState.pipe(
      take(1),
      map((authState) => !!authState),
      tap((authenticated) => {
        if (!authenticated) {
          console.log('User is not authenticated');
          this.router.navigate(['auth']);
        }
      })
    );
  }
}
