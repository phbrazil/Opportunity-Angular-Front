import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DemoRequestModalComponent } from '../demo-request-modal/demo-request-modal.component';

@Component({
  selector: 'app-demo-landing-page',
  templateUrl: './demo-landing-page.component.html',
  styleUrls: ['./demo-landing-page.component.scss'],
})
export class DemoLandingPageComponent {
  readonly paymentRows = [
    {
      code: 'B-118',
      name: 'Nordwind AG - Fatura 8841',
      amount: '€48.200',
      status: 'Aprovado',
      tone: 'approved',
    },
    {
      code: 'B-119',
      name: 'Helvetia Logistics - PO 2201',
      amount: '€36.100',
      status: 'Pendente',
      tone: 'pending',
    },
    {
      code: 'B-120',
      name: 'Rheinwerk GmbH - Fatura 9020',
      amount: '€128.000',
      status: 'Escalado',
      tone: 'escalated',
    },
  ];

  constructor(public dialog: MatDialog) {}

  login() {
    this.dialog.open(LoginComponent);
  }

  scheduleDemo() {
    this.dialog.open(DemoRequestModalComponent);
  }
}
