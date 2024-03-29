import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Settings } from 'src/app/_models/settings';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  message: string = '';
  messageType: string = '';

  formLogin = this.fb.group({
    emailLogin: ['', Validators.required],
    passwordLogin: ['', Validators.required],
  });

  isLoading: boolean = false;

  settings: Settings;

  constructor(private fb: FormBuilder, private alertService: AlertService, public dialog: MatDialog, private router: Router,
    private accountService: AccountService, private settingsService: SettingsService) {

  }

  ngOnInit(): void {

  }

  enviar() {
    if (this.formLogin.invalid) {

      this.alertService.error('Dados incorretos', 'tente novamente', { keepAfterRouteChange: true });

    } else {

      this.postLogin(this.formLogin)

    }

  }

  postLogin(formLogin: FormGroup) {

    this.isLoading = true;

    this.accountService.login(formLogin.value.emailLogin, formLogin.value.passwordLogin).subscribe(res => {

      if (res.pendingEmailConfirmation) {

        this.message = 'Seu email ainda não foi confirmado, verifique sua caixa de emails';
        this.messageType = 'danger';

      } else {

        this.accountService.setUser(res);

        this.accountService.setIsLogged(true);

        this.router.navigate(['/time']);
        this.close();


        //loadSettings
        this.loadSettings();


      }

      this.isLoading = false;


    }, _err => {

      this.isLoading = false;

      this.message = 'Verifique seu email e senha';

      this.messageType = 'danger';

    })

  }

  close() {
    this.dialog.closeAll();
  }

  getOpportunity() {

    this.close();

    this.dialog.open(CreateAccountComponent);
  }

  resetPassword() {

    this.close();

    this.dialog.open(ResetPasswordComponent);


  }

  loadSettings() {
    this.isLoading = true;
    this.accountService.user.pipe(
      mergeMap((user: User) => this.settingsService.getSettings(user.idUser, this.accountService.getToken()))
    ).subscribe(res => {
      this.settingsService.setSettings(res);
      this.isLoading = false;
    }, _err => {
      this.alertService.error('Ocorreu um erro', 'tente novamente mais tarde', { keepAfterRouteChange: true });
      this.isLoading = false;
    })
  }

}
