import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { Settings } from 'src/app/_models/settings';
import { AlertService } from 'src/app/_services/alert.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { Constants } from '../../shared/utils/Constants';
import { ProjectService } from 'src/app/_services/project.service';
import { TaskService } from 'src/app/_services/task.service';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Task } from 'src/app/_models/task';
import { Project } from 'src/app/_models/project';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-stepper-create-account',
  templateUrl: './stepper-create-account.component.html',
  styleUrls: ['./stepper-create-account.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],

})
export class StepperCreateAccountComponent implements OnInit {

  isLinear = true;
  formNameGroup: FormGroup;
  formTaskGroup: FormGroup;
  formBudgetGroup: FormGroup;

  isLoading: boolean = false;
  completed: boolean = false;

  name: string = '';
  task: string = '';
  budget: number = 0;
  user: User;

  faCheck = faCheck;

  constructor(private fb: FormBuilder,
    private router: Router, private accountService: AccountService,
    private alertService: AlertService, private settingsService: SettingsService,
    private projectService: ProjectService,
    private taskService: TaskService) {
    this.accountService.user.subscribe(x => this.user = x);

    this.createForm();
  }

  ngOnInit(): void {
    if (!this.user.initialSetup) {
      //this.router.navigate(['/time']);
    }
  }
  createForm() {
    this.formNameGroup = this.fb.group({
      name: ['', Validators.required]
    });

    this.formTaskGroup = this.fb.group({
      task: ['', Validators.required]
    });
    this.formBudgetGroup = this.fb.group({
      budget: [0, Validators.compose([Validators.required, Validators.min(0)])]
    });

  }

  finish() {

    this.isLoading = true;

    let project = {
      name: this.name,
      budget: this.budget,
      active: true,
      idGroup: this.user.idGroup,
      endDate: '',
      code: ''
    } as Project;


    let task = {
      name: this.task,
      active: true,
      idGroup: this.user.idGroup

    } as Task;

    //add project

    //multiples subscribe using mergemap

    this.projectService.newProject(project, this.user.idUser, this.accountService.getToken()).pipe(
      mergeMap((_newProject) => this.taskService.newTask(task, this.user.idUser, this.accountService.getToken())),
      mergeMap((_newTask) => this.settingsService.disableInitialSetup(this.user.idUser, this.accountService.getToken()))
    ).subscribe(_disableInitialSetup =>{
        this.isLoading = false;
          this.user.initialSetup = false;
          //set new user locally
          this.accountService.setUser(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.defaultSettings();
    }, _err => {
      this.alertService.error(Constants.errorTittle, Constants.errorTittle);
      this.isLoading = false;
    })

/*
    this.projectService.newProject(project, this.user.idUser, this.accountService.getToken()).subscribe(_res => {

      //add task

      this.taskService.newTask(task, this.user.idUser, this.accountService.getToken()).subscribe(_res => {

        //disable initial setup
        this.settingsService.disableInitialSetup(this.user.idUser, this.accountService.getToken()).subscribe(res => {

          this.isLoading = false;

          this.user.initialSetup = false;

          //set new user locally
          this.accountService.setUser(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));

          this.defaultSettings();

        }, _err => {
          this.alertService.error(Constants.errorTittle, Constants.errorTittle);
          this.isLoading = false;
        })

      }, _err => {
        this.alertService.error(Constants.errorTittle, Constants.errorTittle);
        this.isLoading = false;
      })

    }, _err => {
      this.alertService.error(Constants.errorTittle, Constants.errorTittle);
      this.isLoading = false;
    })

    */

  }

  defaultSettings() {

    this.isLoading = true;

    let settings = {

      idUser: this.user.idUser,

      advanceAlertDays: 30,
      advanceRequestApproval: false,
      emailsAdvanceNotify: [this.user.email],
      maxOpenAdvance: 2,

      maxOpenRefund: 2,
      refundRequestApproval: false,
      emailsRefundNotify: [this.user.email],

      timeAlertDays: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'],
      timeRequestApproval: false,

      defaultColor: 'nav-green'

    } as Settings;

    this.settingsService.newSettings(settings, this.accountService.getToken()).subscribe(_res => {
      this.isLoading = false;
      this.completed = true;

    }, _err => {

      this.alertService.error('Ocorreu um erro', 'Tente novamente mais tarde');
      this.isLoading = false;
    })

  }

  public start() {

    this.router.navigate(['/time']);

  }
}
