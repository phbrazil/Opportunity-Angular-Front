import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { mergeMap } from 'rxjs/operators';
import { Settings } from 'src/app/_models/settings';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { AlertService } from 'src/app/_services/alert.service';
import { ProjectService } from 'src/app/_services/project.service';
import { SettingsService } from 'src/app/_services/settings.service';
import { TaskService } from 'src/app/_services/task.service';
import { Constants } from '../../shared/utils/Constants';

@Component({
  selector: 'app-initial-setup',
  templateUrl: './initial-setup.component.html',
  styleUrls: ['./initial-setup.component.scss']
})
export class InitialSetupComponent implements OnInit {

  name: string = '';
  task: string = '';
  budget: number = 0;

  user: User;

  slide: number = 0;

  isLoading: boolean = false;

  active: boolean = true;

  newProjectForm: FormGroup;

  newTaskForm: FormGroup;

  completed: boolean = false;

  faCheck = faCheck;


  constructor(private fb: FormBuilder, private accountService: AccountService, private projectService: ProjectService,
    private taskService: TaskService, private settingsService: SettingsService, private router: Router, private alertService: AlertService) {

    this.accountService.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

    if (!this.user.initialSetup) {
      this.router.navigate(['/time']);
    }

    this.newProjectForm = this.fb.group({
      name: ['', Validators.required],
      code: [''],
      budget: ['', Validators.required],
      endDate: ['', Validators.required],
      active: [this.active, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
    });

    this.newTaskForm = this.fb.group({
      name: ['', Validators.required],
      active: [this.active, Validators.required],
      idGroup: [this.user.idGroup, Validators.required],
    });

  }

  previous() {

    if (this.slide > 0) {
      this.slide = this.slide - 1;
    }
  }

  next() {

    if (this.slide < 3) {
      this.slide = this.slide + 1;
    }
  }

  finish() {

    this.isLoading = true;

    this.newProjectForm.patchValue({ budget: this.budget, name: this.name })
    this.newTaskForm.patchValue({ name: this.task })

    //add project

    //multiples subscribe using mergemap

    this.projectService.newProject(this.newProjectForm.value, this.user.idUser, this.accountService.getToken()).pipe(
      mergeMap((_newProject) => this.taskService.newTask(this.newTaskForm.value, this.user.idUser, this.accountService.getToken())),
      mergeMap((_newTask) => this.settingsService.disableInitialSetup(this.user.idUser, this.accountService.getToken()))
    ).subscribe(_disableInitialSetup => {
      this.isLoading = false;
      this.user.initialSetup = false;
      //set new user locally
      this.accountService.setUser(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.newSettings();
    }, _err => {
      this.alertService.error(Constants.errorTittle, Constants.errorTittle);
      this.isLoading = false;
    })

    /*
    this.projectService.newProject(this.newProjectForm.value, this.user.idUser, this.accountService.getToken()).subscribe(_res => {

      //add task

      this.taskService.newTask(this.newTaskForm.value, this.user.idUser, this.accountService.getToken()).subscribe(_res => {

        //disable initial setup
        this.settingsService.disableInitialSetup(this.user.idUser, this.accountService.getToken()).subscribe(res => {

          this.isLoading = false;

          this.user.initialSetup = false;

          //set new user locally
          this.accountService.setUser(this.user);
          localStorage.setItem('user', JSON.stringify(this.user));

          this.newSettings();

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

  newSettings() {

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

  start() {

    this.router.navigate(['/time']);

  }

}
