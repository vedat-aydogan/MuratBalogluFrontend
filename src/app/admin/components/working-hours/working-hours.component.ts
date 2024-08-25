import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { WorkingHourService } from '../../../services/common/models/working-hour.service';
import { WorkingHourAddModel } from '../../../contracts/models/working-hour-add-model';
import { HttpErrorResponse } from '@angular/common/http';
import { WorkingHourModel } from '../../../contracts/models/working-hour-model';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr-service';

@Component({
  selector: 'app-working-hours',
  templateUrl: './working-hours.component.html',
  styleUrl: './working-hours.component.css'
})
export class WorkingHoursComponent implements OnInit {

  constructor(private formbuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private workingHourService: WorkingHourService,
    private toastrService: CustomToastrService) { }

  workingHoursForm: FormGroup;

  createWorkingHoursForm(): void {
    this.workingHoursForm = this.formbuilder.group({
      monday: [""],
      tuesday: [""],
      wednesday: [""],
      thursday: [""],
      friday: [""],
      saturday: [""],
      sunday: [""]
    });
  }

  addWorkingHours() {
    const workingHourAddModel: WorkingHourAddModel = new WorkingHourAddModel();
    workingHourAddModel.monday = this.workingHoursForm.value.monday;
    workingHourAddModel.tuesday = this.workingHoursForm.value.tuesday;
    workingHourAddModel.wednesday = this.workingHoursForm.value.wednesday;
    workingHourAddModel.thursday = this.workingHoursForm.value.thursday;
    workingHourAddModel.friday = this.workingHoursForm.value.friday;
    workingHourAddModel.saturday = this.workingHoursForm.value.saturday;
    workingHourAddModel.sunday = this.workingHoursForm.value.sunday;

    if (this.workingHoursForm.valid) {
      this.spinnerService.show();

      this.workingHourService.addWorkingHour(workingHourAddModel).subscribe({
        next: (data: WorkingHourAddModel) => {
          this.spinnerService.hide();

          this.workingHoursForm.setValue(data);

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
      this.toastrService.message("Çalışma saatleri formu valid değil ...", "Hata!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopCenter,
        timeOut: 4000
      });
    }
  }

  getWorkingHours() {
    this.spinnerService.show();

    this.workingHourService.getWorkingHours().subscribe({
      next: (data: WorkingHourModel) => {
        if (data != null) {
          this.workingHoursForm.setValue(data);
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
    this.createWorkingHoursForm();
    this.getWorkingHours();
  }

}
