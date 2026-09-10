import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Contact } from 'src/app/_models/contact';
import { ContactService } from 'src/app/_services/contact.service';

@Component({
  selector: 'app-demo-request-modal',
  templateUrl: './demo-request-modal.component.html',
  styleUrls: ['./demo-request-modal.component.scss'],
})
export class DemoRequestModalComponent {
  readonly demoForm = this.formBuilder.group({
    name: ['', Validators.required],
    company: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    tel: ['', Validators.required],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<DemoRequestModalComponent>,
    private readonly contactService: ContactService,
    private messageService: MessageService,
  ) {}

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
            summary: 'Obrigado',
            detail: 'Em breve entraremos em contato',
          });
          this.dialogRef.close(contact);
        },
        error: (err) => {
          this.isLoadingSubject.next(false);
          this.messageService.add({
            severity: 'error',
            summary: 'Ocorreu um erro',
            detail: 'Por favor tente novamente mais tarde',
          });
        },
      });
  }
}
