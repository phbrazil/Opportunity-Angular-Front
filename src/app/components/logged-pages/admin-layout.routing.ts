import { Routes } from "@angular/router";
import { AdvanceComponent } from "./advance/advance.component";
import { HomeComponent } from "./home/home.component";
import { InitialSetupComponent } from "./initial-setup/initial-setup.component";
import { ManageComponent } from "./manage/manage.component";
import { ExpiredComponent } from "./manage/plan-account/expired/expired.component";
import { RefundComponent } from "./refund/refund.component";
import { ReportsComponent } from "./reports/reports.component";
import { RoutesLogged } from "./routes-logged";
import { TimeComponent } from "./time/time.component";


export const AdminLayoutRoutes: Routes = [

    //NOVAS ROTAS INTERNAS DO SITE DEVEM SER INCLUIDAS AQUI
    { path: RoutesLogged.Home, component: HomeComponent },
    { path: RoutesLogged.Time, component: TimeComponent },
    { path: RoutesLogged.Advance, component: AdvanceComponent },
    { path: RoutesLogged.Refund, component: RefundComponent },
    { path: RoutesLogged.Manage, component: ManageComponent },
    { path: RoutesLogged.Reports, component: ReportsComponent },
    { path: RoutesLogged.Setup, component: InitialSetupComponent },
    { path: RoutesLogged.Expired, component: ExpiredComponent },
    { path: RoutesLogged.Default, component: TimeComponent },
];
