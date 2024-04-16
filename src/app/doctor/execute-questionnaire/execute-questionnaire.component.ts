import {Component, OnInit, ViewChild} from '@angular/core';
import {PatientForListModel} from "../../core/models/patient";
import {ModalDirective} from "ngx-bootstrap/modal";
import {DoctorService} from "../../core/services/doctor.service";
import {AuthenticationService} from "../../core/services/auth.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ExecuteQuestionnaireModel, QuestionnaireListModel} from "../../core/models/questionnaire";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-execute-questionnaire',
  templateUrl: './execute-questionnaire.component.html',
  styleUrls: ['./execute-questionnaire.component.css']
})
export class ExecuteQuestionnaireComponent implements OnInit {
  action: string;
  doctorId: number;
  questionnaireForm!: UntypedFormGroup;
  patients: PatientForListModel[];
  questionnaires: QuestionnaireListModel[];
  @ViewChild('removeItemModal', {static: false}) removeItemModal?: ModalDirective;

  constructor(private doctorSrv: DoctorService,
              private authSrv: AuthenticationService,
              private translateSrv: TranslateService,
              private formBuilder: UntypedFormBuilder,
              private router: Router) {
  }

  ngOnInit() {
    this.action = this.translateSrv.instant('GENERIC.EXECUTE_QUESTIONNAIRE');
    this.doctorId = this.authSrv.getCurrentUserProfile.id;
    this.doctorSrv.getAllPatients(this.doctorId).subscribe(x => {
      this.patients = x;
      console.log(x);
    });

    this.doctorSrv.getAllQuestionnaires(this.doctorId).subscribe(x => {
      this.questionnaires = x;
      console.log(x);
    });

    this.questionnaireForm = this.formBuilder.group({
      forPatientId: [''],
      forQuestionnaireId: ['']
    });
  }

  save() {
    if (this.questionnaireForm.valid) {
      let model = new ExecuteQuestionnaireModel();
      model.forPatientId = this.questionnaireForm.get('forPatientId')?.value;
      model.forQuestionnaireId = this.questionnaireForm.get('forQuestionnaireId')?.value;
      model.byDoctorId = this.doctorId;
      this.doctorSrv.executeQuestionnaire(model).subscribe(x => {
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

