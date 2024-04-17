import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactAddModel } from '../../../contracts/models/contact-add-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactService } from '../../../services/common/models/contact.service';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactModel } from '../../../contracts/models/contact-model';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private contactService: ContactService,
    private spinnerService: NgxSpinnerService,
    private alertifyService: AlertifyService) { }

  contactForm: FormGroup;

  createContactForm(): void {
    this.contactForm = this.formbuilder.group({
      mobile: ["", Validators.minLength(13)],
      fixedPhoneOne: [""],
      fixedPhoneOneExtension: [""],
      fixedPhoneTwo: [""],
      fixedPhoneTwoExtension: [""],
      email: ["", Validators.email],
      address: [""],
      googleMap: [""],
    });
  }

  get mobile() {
    return this.contactForm.get("mobile");
  }
  get email() {
    return this.contactForm.get("email");
  }

  addContact() {
    const contactAddModel: ContactAddModel = new ContactAddModel();
    contactAddModel.mobile = this.contactForm.value.mobile;
    contactAddModel.fixedPhoneOne = this.contactForm.value.fixedPhoneOne;
    contactAddModel.fixedPhoneOneExtension = this.contactForm.value.fixedPhoneOneExtension;
    contactAddModel.fixedPhoneTwo = this.contactForm.value.fixedPhoneTwo;
    contactAddModel.fixedPhoneTwoExtension = this.contactForm.value.fixedPhoneTwoExtension;
    contactAddModel.email = this.contactForm.value.email;
    contactAddModel.address = this.contactForm.value.address;
    contactAddModel.googleMap = this.contactForm.value.googleMap;

    if (this.contactForm.valid) {
      this.spinnerService.show();

      this.contactService.addContact(contactAddModel).subscribe({
        next: (data: ContactAddModel) => {
          this.spinnerService.hide();

          this.contactForm.setValue(data);

          this.alertifyService.message("İletişim bilgileri başarılı bir şekilde eklenmiştir.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          });
        },
        error: (error: HttpErrorResponse) => {
          this.spinnerService.hide();

          this.alertifyService.message(error.error, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight
          });
        }
      });
    }
    else {
      if (this.email.errors) {
        this.alertifyService.message("e-mail format hatası !", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopCenter,
          delay: 5
        });
      }

      if (this.mobile.errors) {
        this.alertifyService.message("cep telefonu format hatası ! Format; 533 333 22 11 şeklinde olmalı.", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopCenter,
          delay: 5
        });
      }
    }
  }

  getContact() {
    this.spinnerService.show();

    this.contactService.getContact().subscribe({
      next: (data: ContactModel) => {
        if (data != null) {
          this.contactForm.setValue(data);
        }

        this.spinnerService.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.spinnerService.hide();

        this.alertifyService.message(error.error, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
      }
    });
  }

  ngOnInit(): void {
    this.createContactForm();
    this.getContact();
  }

}
