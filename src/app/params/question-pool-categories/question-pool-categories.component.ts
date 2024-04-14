import {Component, OnInit, ViewChild} from '@angular/core';
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {QuestionPoolCategoryModel} from "../../core/models/question-pool-category";
import {ParamsService} from "../../core/services/params.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-question-pool-categories',
  templateUrl: './question-pool-categories.component.html',
  styleUrls: ['./question-pool-categories.component.css']
})
export class QuestionPoolCategoriesComponent implements OnInit {
  enditem: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  content?: any;
  total: Observable<number>;
  page: any = 1;
  deleteId: any;
  questionPoolCategories: QuestionPoolCategoryModel[];
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  constructor(private paramsSrv: ParamsService,
              private translateSrv: TranslateService,
              private router: Router) {
  }

  ngOnInit() {
    // this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'O rders', active: true }];

    // fetch data
    this.paramsSrv.getAllQuestionPoolCategories().subscribe( x=> {
      this.questionPoolCategories = x;
      console.log(x);
    });
  }

  // Delete Data
  confirm(id: any) {
    this.deleteId = id
    console.log('1');
    this.removeItemModal.show();
  }

  deleteRecord() {
    console.log('2');
    this.removeItemModal.hide();
    this.paramsSrv.deleteQuestionPoolCategoryById(this.deleteId).subscribe(x=> {
      if (x) {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_DELETED'),
          text:  this.translateSrv.instant('GENERIC.SUCCESSFULLY_DELETED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: this.translateSrv.instant('GENERIC.UNABLE_TO_DELETE'),
          text:  this.translateSrv.instant('GENERIC.UNABLE_TO_DELETE'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
      }

    });
  }

  searchOrder() {
  }

  editRecord(id: number) {
    this.router.navigate(['params/question-pool-category-editor', id])
  }

  // pagination
  pagechanged(event: any) {
    // const startItem = (event.page - 1) * event.itemsPerPage;
    // this.enditem = event.page * event.itemsPerPage;
    // this.orderlist = this.orderlist.slice(startItem, this.enditem)
  }
}
