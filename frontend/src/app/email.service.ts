import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient) {}
  sendEmails(emails: string[], subject: string, body: string) {
    const data = {
      emails: emails,
      subject: subject,
      body: body,
    };
    return this.http.post(`${env.SERVER_URL}groups/send_emails`, data);
  }
}
