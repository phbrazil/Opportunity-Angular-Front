import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  //private apiUrl = 'https://mci.opportunity-web.com.br:8081/contact-us';
  //private apiUrl = 'http://localhost:8080/mci/contact-us';
  private apiUrl = 'https://www.opportunity-web.com.br/ContactUpsee';

  constructor(private http: HttpClient) {}

  public contatoUpsee(form: Contact): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(this.apiUrl, form, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
}
