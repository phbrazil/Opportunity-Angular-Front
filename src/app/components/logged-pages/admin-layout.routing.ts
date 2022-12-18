import { Routes } from "@angular/router";
import { AdvanceComponent } from "./advance/advance.component";
import { HomeComponent } from "./home/home.component";
import { InitialSetupComponent } from "./initial-setup/initial-setup.component";
import { ManageComponent } from "./manage/manage.component";
import { ExpiredComponent } from "./manage/plan-account/expired/expired.component";
import { RefundComponent } from "./refund/refund.component";
import { ReportsComponent } from "./reports/reports.component";
import { TimeComponent } from "./time/time.component";


export const AdminLayoutRoutes: Routes = [

    //NOVAS ROTAS INTERNAS DO SITE DEVEM SER INCLUIDAS AQUI
    { path: 'home', component: HomeComponent },
    { path: 'time', component: TimeComponent },
    { path: 'advance', component: AdvanceComponent },
    { path: 'refund', component: RefundComponent },
    { path: 'manage', component: ManageComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'setup', component: InitialSetupComponent },
    //    { path: 'setup', component: StepperCreateAccountComponent },
    { path: 'expired', component: ExpiredComponent },
    //{ path: 'profile', component: ProfileComponent },
    { path: '**', component: TimeComponent },
];
