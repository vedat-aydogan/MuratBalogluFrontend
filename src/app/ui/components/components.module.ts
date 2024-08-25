import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { AboutMeModule } from './about-me/about-me.module';
import { AcademicModule } from './academic/academic.module';
import { BlogsModule } from './blogs/blogs.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { PatientCommentsModule } from './patient-comments/patient-comments.module';
import { SpecialtiesModule } from './specialties/specialties.module';
import { VideosModule } from './videos/videos.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { NewsModule } from './news/news.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    AboutMeModule,
    AcademicModule,
    BlogsModule,
    ContactModule,
    FaqModule,
    PatientCommentsModule,
    SpecialtiesModule,
    VideosModule,
    NewsModule,
    RegisterModule,
    LoginModule
  ]
})
export class ComponentsModule { }
