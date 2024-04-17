import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/common/models/contact.service';
import { ContactModel } from '../../../contracts/models/contact-model';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkingHourService } from '../../../services/common/models/working-hour.service';
import { WorkingHourModel } from '../../../contracts/models/working-hour-model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private contactService: ContactService, private workingHourService: WorkingHourService) { }

  contact: ContactModel;
  workingHour: WorkingHourModel

  getContact() {
    this.contactService.getContact().subscribe({
      next: (data: ContactModel) => {
        this.contact = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  getWorkingHours() {
    this.workingHourService.getWorkingHours().subscribe({
      next: (data: WorkingHourModel) => {
        this.workingHour = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getContact();
    this.getWorkingHours();
  }

}
