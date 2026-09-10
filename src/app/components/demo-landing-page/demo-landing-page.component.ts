import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { DemoRequestModalComponent } from '../demo-request-modal/demo-request-modal.component';
import {
  DEMO_LANDING_COPY,
  DemoLanguage,
} from './demo-landing-page.i18n';

@Component({
  selector: 'app-demo-landing-page',
  templateUrl: './demo-landing-page.component.html',
  styleUrls: ['./demo-landing-page.component.scss'],
})
export class DemoLandingPageComponent implements OnInit {
  readonly paymentRows = [
    {
      code: 'PAG-1182',
      name: 'Hotel Copacabana Palace - NF 8841',
      amount: 'R$ 48.200',
      statusKey: 'approved' as const,
      tone: 'approved',
    },
    {
      code: 'PAG-1193',
      name: 'Buffet Trigo & Cia - Pedido 2201',
      amount: 'R$ 36.100',
      statusKey: 'pending' as const,
      tone: 'pending',
    },
    {
      code: 'PAG-1204',
      name: 'Feira e Exposição Anual - NF 9020',
      amount: 'R$ 128.000',
      statusKey: 'escalated' as const,
      tone: 'escalated',
    },
  ];

  readonly languages: { code: DemoLanguage; label: string }[] = [
    { code: 'pt', label: 'PT' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
  ];

  language: DemoLanguage = 'pt';
  copy: any = DEMO_LANDING_COPY.pt;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.language = this.getInitialLanguage();
    this.copy = DEMO_LANDING_COPY[this.language];
    document.documentElement.lang = this.language;
  }

  changeLanguage(language: DemoLanguage): void {
    this.language = language;
    this.copy = DEMO_LANDING_COPY[language];
    document.documentElement.lang = language;
    localStorage.setItem('opportunity-language', language);
  }

  statusLabel(statusKey: 'approved' | 'pending' | 'escalated'): string {
    return this.copy.board.statuses[statusKey];
  }

  private getInitialLanguage(): DemoLanguage {
    const savedLanguage = localStorage.getItem('opportunity-language');

    if (savedLanguage === 'pt' || savedLanguage === 'en' || savedLanguage === 'es') {
      return savedLanguage;
    }

    const browserLanguage = navigator.language.toLowerCase();

    if (browserLanguage.startsWith('es')) {
      return 'es';
    }

    if (browserLanguage.startsWith('en')) {
      return 'en';
    }

    return 'pt';
  }

  login() {
    this.dialog.open(LoginComponent);
  }

  scheduleDemo() {
    this.dialog.open(DemoRequestModalComponent, {
      width: 'calc(100% - 32px)',
      maxWidth: '790px',
      maxHeight: 'calc(100vh - 24px)',
      data: { language: this.language },
    });
  }
}
