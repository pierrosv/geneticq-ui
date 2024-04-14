import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AdminService} from "../../core/services/admin.service";
import Swal from "sweetalert2";
import {QuestionnaireQuestionModel, QuestionnaireTemplateModel} from "../../core/models/questionnaire-template";
import {QuestionForListModel} from "../../core/models/question";

@Component({
  selector: 'app-questionnaire-template-editor',
  templateUrl: './questionnaire-template-editor.component.html',
  styleUrls: ['./questionnaire-template-editor.component.css']
})
export class QuestionnaireTemplateEditorComponent implements OnInit {
  id: number;
  action: string;
  questionnaireTemplate: QuestionnaireTemplateModel;
  questions: QuestionForListModel[];
  questionnaireTemplateForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
              private adminSrv: AdminService,
              private router: Router) {
  }

  ngOnInit() {
    this.action = this.translateSrv.instant('GENERIC.EDIT');
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id == -1) {
      this.action = this.translateSrv.instant('GENERIC.ADD')
    }
    this.questionnaireTemplateForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.adminSrv.getAllQuestions().subscribe(x=> {
      this.questions = x;
      console.log(this.questions);
    });

    this.adminSrv.getQuestionnaireTemplateById(this.id).subscribe(x=> {
      this.questionnaireTemplate = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.questionnaireTemplateForm.patchValue({name: this.questionnaireTemplate.name});
    this.questionnaireTemplateForm.patchValue({description: this.questionnaireTemplate.description});
  }

  save() {
    if (this.questionnaireTemplateForm.valid) {
      this.questionnaireTemplate.id = -1;
      this.questionnaireTemplate.name = this.questionnaireTemplateForm.get('name')?.value;
      this.questionnaireTemplate.description = this.questionnaireTemplateForm.get('description')?.value;

      if (this.id > 0 ) {
        this.questionnaireTemplate.id = this.id;
      }
      console.log(this.questionnaireTemplate);
      console.log(this.questionnaireTemplate.questions);
      this.adminSrv.saveQuestionnaireTemplate(this.questionnaireTemplate).subscribe(x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['admin/questionnaire-templates']);
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
    let newQuestion = new QuestionnaireQuestionModel();
    let appOrder = 0;
    if (this.questionnaireTemplate.questions.length > 0) {
      for (let num of this.questionnaireTemplate.questions) {
        if (num.appearanceOrder > appOrder) {
          appOrder = num.appearanceOrder; // Update the maxNumber if current number is greater
        }
      }
    }
console.log(this.questionnaireTemplate.questions);
    console.log('1');
    newQuestion.appearanceOrder = appOrder + 1;
    console.log('2');
    this.questionnaireTemplate.questions.push(newQuestion);
    console.log('3');
  }

  deleteQuestion($index) {
    // const index = this.questionnaireTemplate.questions.indexOf(question, 0);
    if ($index > -1) {
      this.questionnaireTemplate.questions.splice($index, 1);
    }
  }
}

