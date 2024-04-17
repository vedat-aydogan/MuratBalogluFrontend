import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client-service';
import { Observable } from 'rxjs';
import { WorkingHourAddModel } from '../../../contracts/models/working-hour-add-model';
import { WorkingHourModel } from '../../../contracts/models/working-hour-model';

@Injectable({
  providedIn: 'root'
})
export class WorkingHourService {

  constructor(private httpClientService: HttpClientService) { }

  addWorkingHour(workingHourAddModel: WorkingHourAddModel): Observable<any> {
    return this.httpClientService.post<any>({ controller: "workinghours" }, workingHourAddModel);
  }

  getWorkingHours(): Observable<WorkingHourModel> {
    return this.httpClientService.get<WorkingHourModel>({ controller: "workinghours" });
  }

  updateWorkingHour(workingHourModel: WorkingHourModel): Observable<any> {
    return this.httpClientService.put<any>({ controller: "workinghours" }, workingHourModel);
  }

}
