import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";
import {QuestionPoolForListModel} from "../../core/models/question-pool";
import {AdminService} from "../../core/services/admin.service";
import {ParamsService} from "../../core/services/params.service";
import {QuestionPoolCategoryModel} from "../../core/models/question-pool-category";

@Component({
  selector: 'app-question-pool-editor',
  templateUrl: './question-pool-editor.component.html',
  styleUrls: ['./question-pool-editor.component.css']
})
export class QuestionPoolEditorComponent  implements OnInit {
  id: number;
  action: string;
  questionPoolCategories: QuestionPoolCategoryModel[];
  questionPool: QuestionPoolForListModel;
  programTypeForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
              private adminSrv: AdminService,
              private paramsSrv: ParamsService,
              private router: Router) {
  }

  ngOnInit() {
    this.action = this.translateSrv.instant('GENERIC.EDIT');
    this.id = +this.route.snapshot.paramMap.get('id');
    if (this.id == -1) {
      this.action = this.translateSrv.instant('GENERIC.ADD')
    }
    /**
     * Form Validation
     */
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
      let questionPool = new QuestionPoolForListModel();
      questionPool.id = -1;
      questionPool.name = this.programTypeForm.get('name')?.value;
      questionPool.description = this.programTypeForm.get('description')?.value;
      questionPool.onCategoryId = this.programTypeForm.get('onCategoryId')?.value;

      if (this.id > 0 ) {
        questionPool.id = this.id;
      }

      this.adminSrv.saveQuestionPool(questionPool).subscribe( x => {
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
}

