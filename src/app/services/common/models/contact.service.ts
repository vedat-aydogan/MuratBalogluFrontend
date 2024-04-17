import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { ContactAddModel } from '../../../contracts/models/contact-add-model';
import { Observable } from 'rxjs';
import { ContactModel } from '../../../contracts/models/contact-model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClientService: HttpClientService) { }

  addContact(contactAddModel: ContactAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "contacts" }, contactAddModel);
  }

  getContact(): Observable<ContactModel> {
    return this.httpClientService.get<ContactModel>({ controller: "contacts" });
  }

  updateContact(contactModel: ContactModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "contacts" }, contactModel);
  }

}
