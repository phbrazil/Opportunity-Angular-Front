import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AlertComponent } from './alert';
import { DataTablesModule } from 'angular-datatables';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { Calendar, FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { NgxCurrencyModule } from 'ngx-currency';
import { SpinnerLoaderComponent } from './spinner-loader/spinner-loader.component';
import { NoRegisterFoundComponent } from './no-register-found/no-register-found.component';
import { TrialBannerComponent } from './trial-banner/trial-banner.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);
@NgModule({
  declarations: [
    AlertComponent,
    SpinnerLoaderComponent,
    NoRegisterFoundComponent,
    TrialBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    DataTablesModule,
    NgxMaskModule.forRoot(),
    FullCalendarModule,
    NgxCurrencyModule
  ],

  exports: [
    AlertComponent,
    DataTablesModule,
    NgxMaskModule,
    FullCalendarModule,
    NgxCurrencyModule,
    SpinnerLoaderComponent,
    NoRegisterFoundComponent,
    TrialBannerComponent
  ]
})
export class SharedModule {


}
