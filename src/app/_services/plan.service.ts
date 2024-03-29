﻿import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertService } from './alert.service';
import { MatDialog } from '@angular/material/dialog';
import { Plan } from '../_models/plan';
import { Constants } from '../components/shared/utils/Constants';
import moment from 'moment';
import { TimeService } from './time.service';
@Injectable({ providedIn: 'root' })
export class PlanService {
  private planSubject: BehaviorSubject<Plan>;
  public plan: Observable<Plan>;

  private isReloadPlan = new BehaviorSubject<boolean>(false);

  readonly baseUrl: string = Constants.baseUrl;


  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
    public dialog: MatDialog,
    private timeService: TimeService
  ) {
    this.planSubject = new BehaviorSubject<Plan>(JSON.parse(localStorage.getItem('plan')));
    this.plan = this.planSubject.asObservable();
  }

  public get rolesValue(): Plan {
    return this.planSubject.value;
  }

  public setPlan(plan: Plan) {

    this.planSubject.next(plan);

  }

  public setIsReload(status: boolean): void {
    this.isReloadPlan.next(status);
  }

  public getIsReload(): Observable<boolean> {
    return this.isReloadPlan.asObservable();

  }

  getPlan(idUser: number, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }


    const url = `${this.baseUrl}/account/api/auth/plan/getPlan/${idUser}`

    return this.http.get<Plan>(url, header);
  }

  newPlan(body: any, token: string) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/account/api/auth/plan/newPlan`

    return this.http.post<Plan>(url, body, header);
  }

  changePlan(body: any, idPlan: number, token: string,) {

    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    }

    const url = `${this.baseUrl}/account/api/auth/plan/changePlan/${idPlan}`

    return this.http.post<Plan>(url, body, header);
  }

  getDaysLeft(trialDate: string): number{

    let day: Date = new Date();

    let today = moment(new Date(day)).format('MM/DD/YYYY');


    var date1 = new Date(today);
    var date2 = new Date(this.timeService.convertDDMMYYYToYYYYMMDD(trialDate));

    var Difference_In_Time = date2.getTime() - date1.getTime();

    return Math.round(Difference_In_Time / (1000 * 3600 * 24));

  }

  calcPricing(plan: Plan, activeUsers: number): number {

    let currentPlanValue = 0;

    let multiply = plan.plan == 'Pro' ? Constants.multiplyPro : Constants.multiplyCorp;

    plan.enableTime ? multiply = multiply + 5 : multiply = multiply - 0;
    plan.enableAdvance ? multiply = multiply + 5 : multiply = multiply - 0;
    plan.enableRefund ? multiply = multiply + 5 : multiply = multiply - 0;

    if (plan.enableTime || plan.enableRefund || plan.enableAdvance) {
      currentPlanValue = activeUsers * multiply;
    } else {
      currentPlanValue = 0;
    }

    return currentPlanValue;

  }

}
