import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { TimeComponent } from './time/time.component';
import { AdvanceComponent } from './advance/advance.component';
import { RefundComponent } from './refund/refund.component';
import { ManageComponent } from './manage/manage.component';
import { ProfileComponent } from './manage/profile/profile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee, faFilm, faFish } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { NewEntryComponent } from './time/new-entry/new-entry.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TasksComponent } from './time/tasks/tasks.component';
import { LoggedFooterComponent } from './logged-footer/logged-footer.component';
import { EditTaskComponent } from './time/tasks/edit-task/edit-task.component';
import { DeleteTaskComponent } from './time/tasks/delete-task/delete-task.component';
import { NewAdvanceComponent } from './advance/new-advance/new-advance.component';
import { ProjectsComponent } from './manage/projects/projects.component';
import { NewProjectComponent } from './manage/projects/new-project/new-project.component';
import { TasksManagerComponent } from './tasks-manager/tasks-manager.component';
import { NewTaskManagerComponent } from './tasks-manager/new-task-manager/new-task-manager.component';
import { PlanAccountComponent } from './manage/plan-account/plan-account.component';
import { ReportsComponent } from './reports/reports.component';
import { LbdChartComponent } from './lbd/lbd-chart/lbd-chart.component';
import { SettingsComponent } from './manage/settings/settings.component';
import { MyTimeComponent } from './time/my-time/my-time.component';
import { MyTeamComponent } from './manage/my-team/my-team.component';
import { TimeReportsComponent } from './reports/time-reports/time-reports.component';
import { NewMemberComponent } from './manage/my-team/new-member/new-member.component';
import { ProjectReportsComponent } from './reports/project-reports/project-reports.component';
import { TeamReportsComponent } from './reports/team-reports/team-reports.component';
import { ChangePlanComponent } from './manage/plan-account/change-plan/change-plan.component';
import { NewCardComponent } from './manage/plan-account/cards/new-card.component';
import { EditProfileComponent } from './manage/profile/edit-profile/edit-profile.component';
import { DisableMemberComponent } from './manage/my-team/disable-member/disable-member.component';
import { EnableMemberComponent } from './manage/my-team/enable-member/enable-member.component';
import { AccountabilityComponent } from './advance/accountability/accountability.component';
import { MoreInfoComponentAdvance } from './advance/more-info-advance/more-info-advance.component';
import { ReceiptAdvanceComponent } from './advance/accountability/receipt-advance/receipt-advance.component';
import { InitialSetupComponent } from './initial-setup/initial-setup.component';
import { ExpiredComponent } from './manage/plan-account/expired/expired.component';
import { ConfirmCancelSubscribeComponent } from './manage/plan-account/confirm-cancel-subscribe/confirm-cancel-subscribe.component';
import { PipesModule } from '../shared/pipes/pipes.module';
import { StepperCreateAccountComponent } from './stepper-create-account/stepper-create-account.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent,
    RefundComponent,
    ManageComponent,
    ProfileComponent,
    NewEntryComponent,
    TasksComponent,
    LoggedFooterComponent,
    EditTaskComponent,
    DeleteTaskComponent,
    NewAdvanceComponent,
    ProjectsComponent,
    NewProjectComponent,
    TasksManagerComponent,
    NewTaskManagerComponent,
    PlanAccountComponent,
    ReportsComponent,
    LbdChartComponent,
    SettingsComponent,
    MyTimeComponent,
    MyTeamComponent,
    TimeReportsComponent,
    NewMemberComponent,
    ProjectReportsComponent,
    TeamReportsComponent,
    ChangePlanComponent,
    NewCardComponent,
    EditProfileComponent,
    DisableMemberComponent,
    EnableMemberComponent,
    AccountabilityComponent,
    MoreInfoComponentAdvance,
    ReceiptAdvanceComponent,
    InitialSetupComponent,
    ExpiredComponent,
    ConfirmCancelSubscribeComponent,
    StepperCreateAccountComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FontAwesomeModule,
    NgbDatepickerModule,
    NgSelectModule,
    PipesModule,
    //ANGULAR MATERIAL
    AngularMaterialModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule

  ], exports: [
    NavbarComponent,
    TimeComponent,
    AdvanceComponent,
    LoggedFooterComponent,

  ],
  providers: [

  ]
})
export class AdminLayoutModule {

  constructor() {
    library.add(faFilm, faFish, faCoffee);
  }

}
