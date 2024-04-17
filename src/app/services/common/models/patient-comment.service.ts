import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { PatientCommentAddModel } from '../../../contracts/models/patient-comment-add-model';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { PatientCommentModel } from '../../../contracts/models/patient-comment-model';

@Injectable({
  providedIn: 'root'
})
export class PatientCommentService {

  constructor(private httpClientService: HttpClientService) { }

  addPatientComment(patientCommentAddModel: PatientCommentAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "patientcomments" }, patientCommentAddModel);
  }

  getPatientComments(): Observable<PatientCommentModel[]> {
    return this.httpClientService.get<PatientCommentModel[]>({ controller: "patientcomments" });
  }

  deletePatientComment(id: string): Observable<any> {
    return this.httpClientService.delete<any>({ controller: "patientcomments" }, id);
  }

  updatePatientComment(patientCommentModel: PatientCommentModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "patientcomments" }, patientCommentModel);
  }

  getLastTwelvePatientComment(): Observable<PatientCommentModel[]> {
    return this.httpClientService.get<PatientCommentModel[]>({ controller: "patientcomments", action: "getlasttwelvepatientcomment" });
  }

  async getPatientCommentsAsync(): Promise<PatientCommentModel[]> {
    const getPatientComments: Observable<PatientCommentModel[]> = this.httpClientService.get<PatientCommentModel[]>({ controller: "patientcomments" });
    const patientComments = await lastValueFrom(getPatientComments);

    return patientComments;
  }

}
