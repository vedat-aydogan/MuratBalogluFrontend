import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactAddModel } from '../../../contracts/models/contact-add-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ContactService } from '../../../services/common/models/contact.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ContactModel } from '../../../contracts/models/contact-model';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private contactService: ContactService,
    private spinnerService: NgxSpinnerService,
    private toastrService: CustomToastrService) { }

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

          this.toastrService.message("Yükleme işlemi gerçekleşmiştir", "Başarılı", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopCenter,
            timeOut: 4000
          });
        },
        error: (error: HttpErrorResponse) => {
          if ((error.status != 401) && (error.status != 403) && (error.status != 500)) {
            this.spinnerService.hide();

            this.toastrService.message(error.error.message, "Hata!", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopCenter,
              timeOut: 4000
            });
          }
        }
      });
    }
    else {
      if (this.email.errors) {
        this.toastrService.message("e-mail format hatası !", "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      }

      if (this.mobile.errors) {
        this.toastrService.message("Format; 533 333 22 11 şeklinde olmalı.", "Cep telefonu format hatası !", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
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

        this.toastrService.message(error.error.message, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      }
    });
  }

  ngOnInit(): void {
    this.createContactForm();
    this.getContact();
  }

}
