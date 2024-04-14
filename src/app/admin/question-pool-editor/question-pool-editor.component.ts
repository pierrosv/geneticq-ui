import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";
import {QuestionPoolForListModel, QuestionPoolModel} from "../../core/models/question-pool";
import {AdminService} from "../../core/services/admin.service";
import {ParamsService} from "../../core/services/params.service";
import {QuestionPoolCategoryModel} from "../../core/models/question-pool-category";
import {StaticDataService} from "../../core/services/static-data.service";
import {StaticDataModel} from "../../core/models/static-data";
import {QuestionModel} from "../../core/models/question";

@Component({
  selector: 'app-question-pool-editor',
  templateUrl: './question-pool-editor.component.html',
  styleUrls: ['./question-pool-editor.component.css']
})
export class QuestionPoolEditorComponent  implements OnInit {
  id: number;
  action: string;
  questionPoolCategories: QuestionPoolCategoryModel[];
  questionAnswerTypes: StaticDataModel[];
  questionPool: QuestionPoolModel;
  programTypeForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
              private adminSrv: AdminService,
              private paramsSrv: ParamsService,
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
    });

    this.paramsSrv.getAllQuestionPoolCategories().subscribe(x=> {
      this.questionPoolCategories = x;
    })

    this.programTypeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      onCategoryId: [0, [Validators.required]],
    });
    this.adminSrv.getQuestionPoolById(this.id).subscribe(x=> {
      this.questionPool = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.programTypeForm.patchValue({name: this.questionPool.name});
    this.programTypeForm.patchValue({description: this.questionPool.description});
    this.programTypeForm.patchValue({onCategoryId: this.questionPool.onCategoryId});
  }

  save() {
    if (this.programTypeForm.valid) {
      this.questionPool.id = -1;
      this.questionPool.name = this.programTypeForm.get('name')?.value;
      this.questionPool.description = this.programTypeForm.get('description')?.value;
      this.questionPool.onCategoryId = this.programTypeForm.get('onCategoryId')?.value;

      if (this.id > 0 ) {
        this.questionPool.id = this.id;
      }

      this.adminSrv.saveQuestionPool(this.questionPool).subscribe( x => {
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
    if (this.questionPool.questions.length > 0) {
      for (let num of this.questionPool.questions) {
        if (num.appearanceOrder > appOrder) {
          appOrder = num.appearanceOrder; // Update the maxNumber if current number is greater
        }
      }
    }

    newQuestion.appearanceOrder = appOrder + 1;
    this.questionPool.questions.push(newQuestion);
  }

  deleteQuestion(question) {
    const index = this.questionPool.questions.indexOf(question, 0);
    if (index > -1) {
      this.questionPool.questions.splice(index, 1);
    }
  }
}

