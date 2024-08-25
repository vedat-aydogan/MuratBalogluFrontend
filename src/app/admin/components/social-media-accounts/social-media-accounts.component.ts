import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocialMediaAccountAddModel } from '../../../contracts/models/social-media-account-add-model';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocialMediaAccountService } from '../../../services/common/models/social-media-account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialMediaAccountModel } from '../../../contracts/models/social-media-account-model';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-social-media-accounts',
  templateUrl: './social-media-accounts.component.html',
  styleUrl: './social-media-accounts.component.css'
})
export class SocialMediaAccountsComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private socialMediaAccountService: SocialMediaAccountService,
    private toastrService: CustomToastrService) { }

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
      this.toastrService.message("Sosyal medya hesapları formu valid değil ...", "Hata!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter,
        timeOut: 4000
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

        this.toastrService.message(error.error.message, "Hata!", {
          messageType: ToastrMessageType.Error,
          position: ToastrPosition.TopCenter,
          timeOut: 4000
        });
      }
    });
  }

  ngOnInit(): void {
    this.createSocialMediaAccountsForm();
    this.getSocialMediaAccounts();
  }

}
