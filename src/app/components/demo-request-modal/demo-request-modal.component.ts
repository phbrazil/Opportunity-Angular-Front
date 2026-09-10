import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Contact } from 'src/app/_models/contact';
import { ContactService } from 'src/app/_services/contact.service';
import {
  DEMO_LANDING_COPY,
  DemoLanguage,
} from '../demo-landing-page/demo-landing-page.i18n';

@Component({
  selector: 'app-demo-request-modal',
  templateUrl: './demo-request-modal.component.html',
  styleUrls: ['./demo-request-modal.component.scss'],
})
export class DemoRequestModalComponent {
  copy: any = DEMO_LANDING_COPY.pt.modal;

  readonly demoForm = this.formBuilder.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', Validators.required],
    subject: ['', Validators.required],
    textarea: ['', Validators.required],
  });

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DemoRequestModalComponent>,
    private readonly contactService: ContactService,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) private readonly data: { language?: DemoLanguage },
  ) {
    const language = data?.language || 'pt';
    this.copy = DEMO_LANDING_COPY[language].modal;
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.demoForm.invalid) {
      this.demoForm.markAllAsTouched();
      return;
    }

    this.isLoadingSubject.next(true);

    const contact = this.demoForm.value as Contact;

    this.contactService
      .contatoUpsee(contact)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          this.isLoadingSubject.next(false);
          this.demoForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: this.copy.successTitle,
            detail: this.copy.successMessage,
          });
          this.dialogRef.close(contact);
        },
        error: (err) => {
          this.isLoadingSubject.next(false);
          this.messageService.add({
            severity: 'error',
            summary: this.copy.errorTitle,
            detail: this.copy.errorMessage,
          });
        },
      });
  }
}
