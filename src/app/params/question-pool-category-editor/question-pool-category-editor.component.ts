import {Component, OnInit} from '@angular/core';
import Swal from "sweetalert2";
import {QuestionPoolCategoryModel} from "../../core/models/question-pool-category";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ParamsService} from "../../core/services/params.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-question-pool-category-editor',
  templateUrl: './question-pool-category-editor.component.html',
  styleUrls: ['./question-pool-category-editor.component.css']
})
export class QuestionPoolCategoryEditorComponent implements OnInit {
  id: number;
  action: string;
  questionPoolCategory: QuestionPoolCategoryModel;
  programTypeForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
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
    this.programTypeForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    this.paramsSrv.getQuestionPoolCategoryById(this.id).subscribe(x=> {
      this.questionPoolCategory = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.programTypeForm.patchValue({name: this.questionPoolCategory.name});
    this.programTypeForm.patchValue({description: this.questionPoolCategory.description});
  }

  save() {
    console.log('Saving Person');
    if (this.programTypeForm.valid) {
      let category = new QuestionPoolCategoryModel();
      category.id = -1;
      category.name = this.programTypeForm.get('name')?.value;
      category.description = this.programTypeForm.get('description')?.value;

      if (this.id > 0 ) {
        category.id = this.id;
      }

      this.paramsSrv.saveQuestionPoolCategory(category).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['params/question-pool-categories']);
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

