import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Card } from 'src/app/_models/payment/card';
import { Plan } from 'src/app/_models/plan';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { CardService } from 'src/app/_services/card.service';
import { PlanService } from 'src/app/_services/plan.service';
import { TeamService } from 'src/app/_services/team.service';
import { ChangePlanComponent } from './change-plan/change-plan.component';
import { ConfirmCancelSubscribeComponent } from './confirm-cancel-subscribe/confirm-cancel-subscribe.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Subject } from 'rxjs';
import { SharedService } from 'src/app/_services/shared.service';

@Component({
  selector: 'app-plan-account',
  templateUrl: './plan-account.component.html',
  styleUrls: ['./plan-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class PlanAccountComponent implements OnInit {

  user: User;

  activeUsers: number = 1;
  currentPlanValue: number = 0;
  brand: string = 'visa'
  isLoading: boolean = false;
  isPlanSelected: boolean = false;
  plan: Plan;
  card: Card;
  isLinear: boolean = true;
  isAddingNewCard: boolean = false;

  constructor(private accountService: AccountService, private dialog: MatDialog,
    private planService: PlanService, private cardService: CardService,
    private teamService: TeamService, private sharedService: SharedService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    this.planService.getIsReload().subscribe(res => {
      console.log(res);
      if (res) {
        this.loadActiveMembers();
        //this.loadPlan();
        //this.loadCard();
      }
    })

    if (this.user.admin) {
      this.loadActiveMembers();
      //this.loadPlan();
      //this.loadCard();

    }

  }


  loadActiveMembers() {

    this.isLoading = true;

    this.teamService.getTeamMembers(this.user.idUser, this.user.idGroup, this.accountService.getToken()).subscribe(res => {
      console.log(res)
      if(res){
        this.activeUsers = res.length;
      }
      this.loadPlan();
    }, _err => {
      this.isLoading = false;
    })
  }

  changePlan() {

    this.dialog.open(ChangePlanComponent);

  }

  loadPlan() {

    this.planService.getPlan(this.user.idUser, this.accountService.getToken()).subscribe(res => {
      this.plan = res;
      this.currentPlanValue = this.planService.calcPricing(this.plan, this.activeUsers);

      if (this.user) {
        this.loadCard();
      }
    }, _err => {
      this.isLoading = false;
    })

  }


  loadCard() {
    this.cardService.getCard(this.user.idUser, this.accountService.getToken()).subscribe(res => {
      this.card = res;
      this.isLoading = false;
      console.log('card ', this.card);
    }, _err => {
      this.isLoading = false;
    })

  }

  confirmCancelSubscribe() {

    this.dialog.open(ConfirmCancelSubscribeComponent,
      {
        data: {
          subId: this.card.subId
        }
      })

  }

  reactiveSubscribe() {

    this.isLoading = true;

  }

  nextPage(event: boolean){
    this.isAddingNewCard = event;
    this.loadPlan();
    this.sharedService.setStatus(true);
  }

  editPlan(){
    this.isAddingNewCard = false;
    this.sharedService.setStatus(false);
  }

}
