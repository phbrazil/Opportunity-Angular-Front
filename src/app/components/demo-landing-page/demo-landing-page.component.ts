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
      code: 'PAG-1182',
      name: 'Hotel Copacabana Palace - NF 8841',
      amount: 'R$ 48.200',
      status: 'Aprovado',
      tone: 'approved',
    },
    {
      code: 'PAG-1193',
      name: 'Buffet Trigo & Cia - Pedido 2201',
      amount: 'R$ 36.100',
      status: 'Pendente',
      tone: 'pending',
    },
    {
      code: 'PAG-1204',
      name: 'Feira e Exposição Anual - NF 9020',
      amount: 'R$ 128.000',
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
