import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialMediaAccountAddModel } from '../../../contracts/models/social-media-account-add-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocialMediaAccountService } from '../../../services/common/models/social-media-account.service';
import { AlertifyService, MessageType, Position } from '../../../services/admin/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialMediaAccountModel } from '../../../contracts/models/social-media-account-model';

@Component({
  selector: 'app-social-media-accounts',
  templateUrl: './social-media-accounts.component.html',
  styleUrl: './social-media-accounts.component.css'
})
export class SocialMediaAccountsComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private socialMediaAccountService: SocialMediaAccountService,
    private alertifyService: AlertifyService) { }

  socialMediaAccountsForm: FormGroup;

  createSocialMediaAccountsForm(): void {
    this.socialMediaAccountsForm = this.formbuilder.group({
      youTube: [""],
      linkedIn: [""],
      instagram: [""],
      facebook: [""],
      x: [""]
    });
  }

  addSocialMediaAccounts() {
    const socialMediaAccountAddModel: SocialMediaAccountAddModel = new SocialMediaAccountAddModel();
    socialMediaAccountAddModel.facebook = this.socialMediaAccountsForm.value.facebook;
    socialMediaAccountAddModel.instagram = this.socialMediaAccountsForm.value.instagram;
    socialMediaAccountAddModel.linkedIn = this.socialMediaAccountsForm.value.linkedIn;
    socialMediaAccountAddModel.x = this.socialMediaAccountsForm.value.x;
    socialMediaAccountAddModel.youTube = this.socialMediaAccountsForm.value.youTube;

    if (this.socialMediaAccountsForm.valid) {
      this.spinnerService.show();

      this.socialMediaAccountService.addSocialMediaAccount(socialMediaAccountAddModel).subscribe({
        next: (data: SocialMediaAccountAddModel) => {
          this.spinnerService.hide();

          this.socialMediaAccountsForm.setValue(data);

          this.alertifyService.message("Sosyal medya hesapları başarılı bir şekilde eklenmiştir.", {
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
      this.alertifyService.message("Sosyal medya hesapları formu valid değil ...", {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopCenter,
        delay: 5
      });
    }
  }

  getSocialMediaAccounts() {
    this.spinnerService.show();

    this.socialMediaAccountService.getSocialMediaAccounts().subscribe({
      next: (data: SocialMediaAccountModel) => {
        if (data != null) {
          this.socialMediaAccountsForm.setValue(data);
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
    this.createSocialMediaAccountsForm();
    this.getSocialMediaAccounts();
  }

}
