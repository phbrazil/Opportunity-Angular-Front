import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mergeMap } from 'rxjs/operators';
import { Card } from 'src/app/_models/payment/card';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { CardService } from 'src/app/_services/card.service';

@Component({
  selector: 'app-confirm-cancel-subscribe',
  templateUrl: './confirm-cancel-subscribe.component.html',
  styleUrls: ['./confirm-cancel-subscribe.component.scss']
})
export class ConfirmCancelSubscribeComponent implements OnInit {

  isLoading: boolean = false;
  user: User;

  constructor(private accountService: AccountService,
    private cardService: CardService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {
  }

  cancelSubscribe() {

    this.isLoading = true;

    this.cardService.cancelSubscribe(this.user.idUser, this.data.subId, this.accountService.getToken()).pipe(
      mergeMap((_cancelSubscribe) => this.cardService.deleteCard(this.user.idUser, this.accountService.getToken()))
    ).subscribe(_deleteCard => {

      //set trial locally
      this.user.trial = true;
      this.accountService.setUser(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.isLoading = false;
      this.close();
      this.alertService.error('Assinatura cancelada', 'Para continuar usando nossa ferramenta reative sua assinatura');

    }, _err =>{
      this.alertService.error('Ocorreu um erro', 'Tente novamente mais tarde')
      this.isLoading =false;
    })

    /*

    this.cardService.cancelSubscribe(this.user.idUser, this.data.subId, this.accountService.getToken()).subscribe(res => {

      console.log(res)

      //set trial locally
      this.user.trial = true;

      this.accountService.setUser(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));


      //delete card
      this.cardService.deleteCard(this.user.idUser, this.accountService.getToken()).subscribe(res => {

        this.isLoading = false;

        this.close();

        this.alertService.error('Assinatura cancelada', 'Para continuar usando nossa ferramenta reative sua assinatura')

      },_err => {
        this.isLoading = false;
      })

    }, _err => {
      console.log(_err);
      this.isLoading = false;
    })
    */
  }

  close() {
    this.dialog.closeAll();
  }

}
