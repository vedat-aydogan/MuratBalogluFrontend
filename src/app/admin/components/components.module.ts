import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeModule } from './about-me/about-me.module';
import { BlogsModule } from './blogs/blogs.module';
import { ContactModule } from './contact/contact.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FaqModule } from './faq/faq.module';
import { LanguagesModule } from './languages/languages.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { VideosModule } from './videos/videos.module';
import { SocialMediaAccountsModule } from './social-media-accounts/social-media-accounts.module';
import { PatientCommentsModule } from './patient-comments/patient-comments.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AboutMeModule,
    BlogsModule,
    ContactModule,
    DashboardModule,
    FaqModule,
    LanguagesModule,
    SpecialtiesModule,
    VideosModule,
    SocialMediaAccountsModule,
    PatientCommentsModule
  ]
})
export class ComponentsModule { }
