import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {QuestionnaireExecutionModel, QuestionnaireModel} from "../../core/models/questionnaire";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {DoctorService} from "../../core/services/doctor.service";
import {AdminService} from "../../core/services/admin.service";
import {AuthenticationService} from "../../core/services/auth.service";
import {StaticDataService} from "../../core/services/static-data.service";
import {StaticDataModel} from "../../core/models/static-data";
import Swal from "sweetalert2";

@Component({
  selector: 'app-questionnaire-execution',
  templateUrl: './questionnaire-execution.component.html',
  styleUrls: ['./questionnaire-execution.component.css']
})
export class QuestionnaireExecutionComponent implements OnInit {
  id: number;
  doctorId: number;
  action: string;
  execution: QuestionnaireExecutionModel;
  questionnaireForm!: UntypedFormGroup;
  questionAnswerTypes: StaticDataModel[];

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
              private doctorSrv: DoctorService,
              private authSrv: AuthenticationService,
              private staticDataSrv: StaticDataService,
              private router: Router) {
  }

  ngOnInit() {
    this.action = this.translateSrv.instant('GENERIC.EDIT');
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id == -1) {
      this.action = this.translateSrv.instant('GENERIC.ADD')
    }

    this.staticDataSrv.getQuestionAnswerTypes().subscribe(x=> {
      this.questionAnswerTypes = x;
      console.log(x);
    });

    this.questionnaireForm = this.formBuilder.group({
      id: [''],
      notes: [''],
    });

    this.doctorId = this.authSrv.getCurrentUserProfile.id;

    this.doctorSrv.getQuestionnaireExecutionById(this.id).subscribe(x=> {
      this.execution = x;
      console.log(x);
      this.patchForm();
    });
  }

  patchForm() {
    this.questionnaireForm.patchValue({notes: this.execution.notes});
  }

  save() {
    if (this.questionnaireForm.valid) {
      this.execution.notes   = this.questionnaireForm.get('notes')?.value;

      this.doctorSrv.saveQuestionnaireExecution(this.execution).subscribe(x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['doctor/questionnaire-results']);
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: this.translateSrv.instant('GENERIC.UNABLE_TO_SAVE'),
        text:  this.translateSrv.instant('GENERIC.UNABLE_TO_SAVE'),
        customClass: {
          confirmButton: 'btn btn-primary'
        },
        buttonsStyling: true
      });
    }
  }
}
