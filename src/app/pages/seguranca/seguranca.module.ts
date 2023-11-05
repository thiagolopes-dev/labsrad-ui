import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from 'src/app/shared/shared.module';

import { environment } from 'src/environments/environment';
import { PrimeNGModule } from './../../primeng.module';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { UniradHttpInterceptor } from './login/unirad-http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SegurancaRoutingModule } from './seguranca.routing';

export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [
   PrimeNGModule,
   SegurancaRoutingModule,
   SharedModule,
   JwtModule.forRoot({
    config: {
      // tslint:disable-next-line: object-literal-shorthand
      tokenGetter: tokenGetter,
      allowedDomains: environment.whiteListedDomains,
      disallowedRoutes: environment.blackListedDomains
    }
}),
],
providers: [

  AuthGuard,
  JwtHelperService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: UniradHttpInterceptor,
    multi: true
}
  ],
  exports: []
})
export class SegurancaModule { }
