import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RoutesLogged } from '../components/logged-pages/routes-logged';
import { User } from '../_models/user';
import { AccountService } from './account.service';
import { PlanService } from './plan.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user: User;
  token: string;

  constructor(private accountService: AccountService, private router: Router,
    private planService: PlanService) {

    this.accountService.user.subscribe(x => {

      this.user = x;

      this.token = this.accountService.getToken();

    });

  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //SETUP INICIAL NO PRIMEIRO ACESSO
    if (this.user?.initialSetup && this.user?.admin) {
      this.router.navigate(['/setup']);
    }

    //SE PRAZO EXPIRADO DIRECIONA PARA PAGAMENTO


    let daysLeft = 0;

    if (this.user) {
      daysLeft = this.planService.getDaysLeft(this.user?.trialDate);

      if (this.user?.trial && this.user?.admin && daysLeft < 1) {
        //if user is not in the manage route redirect to payment method
        if(!this.router.url.includes(RoutesLogged.Manage)){
          this.router.navigate([`/${RoutesLogged.Manage}`]);
        }
      }
    }

    if (!this.token) {

      this.token = this.accountService.getToken();

    }

    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
    });

    return next.handle(req).pipe(
      catchError(err => {

        if (err.status === 401 && err.error.error == 'Unauthorized' && err.error.path != '/account/api/auth/signin') {

          this.accountService.logout();

        } else {
          console.log(err)
        }
        return throwError(err);
      }));

  }

}
