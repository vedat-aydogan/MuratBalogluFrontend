import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../../services/common/models/contact.service';
import { ContactModel } from '../../../../contracts/models/contact-model';
import { HttpErrorResponse } from '@angular/common/http';
import { SpecialityService } from '../../../../services/common/models/speciality.service';
import { TitleAndDetailUrlModel } from '../../../../contracts/models/common/title-and-detail-url-model';
import { SocialMediaAccountService } from '../../../../services/common/models/social-media-account.service';
import { SocialMediaAccountModel } from '../../../../contracts/models/social-media-account-model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  constructor(private contactService: ContactService,
    private specialityService: SpecialityService,
    private socialMediaAccountService: SocialMediaAccountService) { }

  contact: ContactModel;
  mobileWithoutSpace: string;
  fixedPhoneOneWithoutSpace: string;
  fixedPhoneTwoWithoutSpace: string;
  socialMediaAccount: SocialMediaAccountModel;
  titleAndDetailUrlList: TitleAndDetailUrlModel[];

  getContact() {
    this.contactService.getContact().subscribe({
      next: (data: ContactModel) => {
        this.contact = data;
        this.mobileWithoutSpace = data?.mobile.replace(/\s/g, '');
        this.fixedPhoneOneWithoutSpace = data?.fixedPhoneOne.replace(/\s/g, '');
        this.fixedPhoneTwoWithoutSpace = data?.fixedPhoneTwo.replace(/\s/g, '');
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  getSpecialityTitlesAndDetailUrls() {
    this.specialityService.getSpecialityTitlesAndDetailUrls().subscribe({
      next: (data: TitleAndDetailUrlModel[]) => {
        this.titleAndDetailUrlList = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  getSocialMediaAccounts() {
    this.socialMediaAccountService.getSocialMediaAccounts().subscribe({
      next: (data: SocialMediaAccountModel) => {
        this.socialMediaAccount = data;
      },
      error: (error: HttpErrorResponse) => { }
    });
  }

  ngOnInit(): void {
    this.getContact();
    this.getSpecialityTitlesAndDetailUrls();
    this.getSocialMediaAccounts();
  }

}
