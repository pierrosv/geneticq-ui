import {Component, OnInit} from '@angular/core';
import {StaticDataModel} from "../../core/models/static-data";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {StaticDataService} from "../../core/services/static-data.service";
import Swal from "sweetalert2";
import {QuestionModel} from "../../core/models/question";
import {QuestionnaireModel} from "../../core/models/questionnaire";
import {DoctorService} from "../../core/services/doctor.service";
import {AuthenticationService} from "../../core/services/auth.service";
import {AdminService} from "../../core/services/admin.service";
import {QuestionnaireTemplateForListModel} from "../../core/models/questionnaire-template";

@Component({
  selector: 'app-doctor-questionnaire-editor',
  templateUrl: './doctor-questionnaire-editor.component.html',
  styleUrls: ['./doctor-questionnaire-editor.component.css']
})
export class DoctorQuestionnaireEditorComponent  implements OnInit {
  id: number;
  doctorId: number;
  action: string;
  questionAnswerTypes: StaticDataModel[];
  questionnaireTemplates: QuestionnaireTemplateForListModel[];
  questionnaire: QuestionnaireModel;
  questionnaireForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
              private doctorSrv: DoctorService,
              private adminSrv: AdminService,
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

    this.adminSrv.getAllQuestionnaireTemplates().subscribe(x=> {
      this.questionnaireTemplates = x;
    });

    this.staticDataSrv.getQuestionAnswerTypes().subscribe(x=> {
      this.questionAnswerTypes = x;
      console.log(x);
    });

    this.questionnaireForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.doctorId = this.authSrv.getCurrentUserProfile.id;

    this.doctorSrv.getQuestionnaireById(this.doctorId, this.id).subscribe(x=> {
      this.questionnaire = x;
      console.log(x);
      this.patchForm();
    });
  }

  patchForm() {
    this.questionnaireForm.patchValue({name: this.questionnaire.name});
    this.questionnaireForm.patchValue({description: this.questionnaire.description});
    this.questionnaireForm.patchValue({fromTemplateId: this.questionnaire.fromTemplateId});
  }

  save() {
    if (this.questionnaireForm.valid) {
      this.questionnaire.id = -1;
      this.questionnaire.byDoctorId = this.doctorId;
      this.questionnaire.name = this.questionnaireForm.get('name')?.value;
      this.questionnaire.description = this.questionnaireForm.get('description')?.value;
      this.questionnaire.fromTemplateId = this.questionnaireForm.get('fromTemplateId')?.value;

      if (this.id > 0 ) {
        this.questionnaire.id = this.id;
      }

      this.doctorSrv.saveQuestionnaire(this.questionnaire).subscribe(x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['admin/question-pools']);
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

  createQuestion() {
    let newQuestion = new QuestionModel();
    let appOrder = 0;
    if (this.questionnaire.questions.length > 0) {
      for (let num of this.questionnaire.questions) {
        if (num.appearanceOrder > appOrder) {
          appOrder = num.appearanceOrder; // Update the maxNumber if current number is greater
        }
      }
    }

    newQuestion.appearanceOrder = appOrder + 1;
    this.questionnaire.questions.push(newQuestion);
  }

  deleteQuestion(question) {
    const index = this.questionnaire.questions.indexOf(question, 0);
    if (index > -1) {
      this.questionnaire.questions.splice(index, 1);
    }
  }
}
