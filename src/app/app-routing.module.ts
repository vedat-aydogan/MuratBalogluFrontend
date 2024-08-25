import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./ui/layout/layout.component";
import { LayoutComponent as AdminLayoutComponent } from "./admin/layout/layout.component";
import { HomeComponent } from "./ui/components/home/home.component";
import { AboutMeComponent } from "./ui/components/about-me/about-me.component";
import { AcademicComponent } from "./ui/components/academic/academic.component";
import { BlogsComponent } from "./ui/components/blogs/blogs.component";
import { VideosComponent as AdminVideosComponent } from "./admin/components/videos/videos.component";
import { ContactComponent } from "./ui/components/contact/contact.component";
import { ContactComponent as AdminContactComponent } from "./admin/components/contact/contact.component";
import { FaqComponent } from "./ui/components/faq/faq.component";
import { FaqComponent as AdminFaqComponent } from "./admin/components/faq/faq.component";
import { PatientCommentsComponent } from "./ui/components/patient-comments/patient-comments.component";
import { SpecialtiesComponent } from "./ui/components/specialties/specialties.component";
import { VideosComponent } from "./ui/components/videos/videos.component";
import { DashboardComponent } from "./admin/components/dashboard/dashboard.component";
import { SpecialtiesDetailComponent } from "./ui/components/specialties/components/specialties-detail/specialties-detail.component";
import { BlogsDetailComponent } from "./ui/components/blogs/components/blogs-detail/blogs-detail.component";
import { LanguagesComponent as AdminLanguagesComponent } from "./admin/components/languages/languages.component";
import { BlogAddComponent } from "./admin/components/blogs/blog-add/blog-add.component";
import { BlogListComponent } from "./admin/components/blogs/blog-list/blog-list.component";
import { SpecialityAddComponent } from "./admin/components/specialties/speciality-add/speciality-add.component";
import { SpecialityListComponent } from "./admin/components/specialties/speciality-list/speciality-list.component";
import { SocialMediaAccountsComponent } from "./admin/components/social-media-accounts/social-media-accounts.component";
import { PatientCommentAddComponent } from "./admin/components/patient-comments/patient-comment-add/patient-comment-add.component";
import { PatientCommentListComponent } from "./admin/components/patient-comments/patient-comment-list/patient-comment-list.component";
import { BlogUpdateComponent } from "./admin/components/blogs/blog-update/blog-update.component";
import { SpecialityUpdateComponent } from "./admin/components/specialties/speciality-update/speciality-update.component";
import { AboutMeAddComponent } from "./admin/components/about-me/about-me-add/about-me-add.component";
import { HomeAboutMeAddComponent } from "./admin/components/about-me/home-about-me-add/home-about-me-add.component";
import { RegisterComponent } from "./ui/components/register/register.component";
import { LoginComponent } from "./ui/components/login/login.component";
import { authGuard } from "./guards/common/auth.guard";
import { SpecialityCategoriesComponent } from "./admin/components/specialties/speciality-categories/speciality-categories.component";
import { NewsComponent } from "./ui/components/news/news.component";
import { NewsComponent as AdminNewsComponent } from "./admin/components/news/news.component";
import { AuthorizeMenuComponent } from "./admin/components/authorize-menu/authorize-menu.component";
import { RolesComponent } from "./admin/components/roles/roles.component";
import { UsersComponent } from "./admin/components/users/users.component";

const routes: Routes = [
  {
    path: "admin", component: AdminLayoutComponent, children: [
      { path: "", component: DashboardComponent, canActivate: [authGuard] }, //DashboardComponent burada Ui daki HomeComponent kontrolü için kullanılıyor.
      { path: "blog-add", component: BlogAddComponent, canActivate: [authGuard] },
      { path: "blog-list", component: BlogListComponent, canActivate: [authGuard] },
      { path: "blog-update/:id", component: BlogUpdateComponent, canActivate: [authGuard] },
      { path: "speciality-add", component: SpecialityAddComponent, canActivate: [authGuard] },
      { path: "speciality-list", component: SpecialityListComponent, canActivate: [authGuard] },
      { path: "speciality-update/:id", component: SpecialityUpdateComponent, canActivate: [authGuard] },
      { path: "speciality-categories", component: SpecialityCategoriesComponent, canActivate: [authGuard] },
      { path: "about-me-add", component: AboutMeAddComponent, canActivate: [authGuard] },
      { path: "home-about-me-add", component: HomeAboutMeAddComponent, canActivate: [authGuard] },
      // { path: "about-me-image-add", component: AboutMeImageAddComponent, canActivate: [authGuard] },
      { path: "contact", component: AdminContactComponent, canActivate: [authGuard] },
      { path: "faq", component: AdminFaqComponent },
      { path: "languages", component: AdminLanguagesComponent },
      { path: "videos", component: AdminVideosComponent, canActivate: [authGuard] },
      { path: "social-media-accounts", component: SocialMediaAccountsComponent, canActivate: [authGuard] },
      { path: "patient-comment-add", component: PatientCommentAddComponent, canActivate: [authGuard] },
      { path: "patient-comment-list", component: PatientCommentListComponent, canActivate: [authGuard] },
      { path: "news", component: AdminNewsComponent, canActivate: [authGuard] },
      { path: "authorize-menu", component: AuthorizeMenuComponent, canActivate: [authGuard] },
      { path: "roles", component: RolesComponent, canActivate: [authGuard] },
      { path: "users", component: UsersComponent, canActivate: [authGuard] }
    ], canActivate: [authGuard]
  },

  {
    path: "", component: LayoutComponent, children: [
      { path: "", component: HomeComponent },
      { path: "anasayfa", component: HomeComponent },
      { path: "hakkinda", component: AboutMeComponent },
      { path: "akademik", component: AcademicComponent },
      { path: "bloglar", component: BlogsComponent },
      { path: "blog/:detailUrl", component: BlogsDetailComponent },
      { path: "iletisim", component: ContactComponent },
      { path: "sikca-sorulan-sorular", component: FaqComponent },
      { path: "hasta-yorumlari", component: PatientCommentsComponent },
      { path: "uzmanliklari", component: SpecialtiesComponent },
      { path: "uzmanliklari/:categoryUrl", component: SpecialtiesComponent },
      { path: "uzmanlik/:detailUrl", component: SpecialtiesDetailComponent },
      { path: "videolar", component: VideosComponent },
      { path: "basinda-biz", component: NewsComponent },
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
