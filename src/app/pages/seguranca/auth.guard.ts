import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private messageService: MessageService
    ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.auth.isAccessTokenInvalido()) {

        return this.auth.obterNovoAccessToken()
        .then(() =>  {
          if (this.auth.isAccessTokenInvalido()) {
            this.messageService.add({severity: 'warn', summary: 'Expirou sua navegação', detail: 'efetue o login novamente...'});
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        });

      } else if (next.data.roles && !this.auth.regrasdePermissao(next.data.roles)) {
        this.router.navigate(['/nao-autorizado']);
        return false;
      }

      return true;
  }

}
