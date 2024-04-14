import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {QuestionPoolForListModel} from "../../core/models/question-pool";
import {AdminService} from "../../core/services/admin.service";

@Component({
  selector: 'app-question-pools',
  templateUrl: './question-pools.component.html',
  styleUrls: ['./question-pools.component.css']
})
export class QuestionPoolsComponent  implements OnInit {
  enditem: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  content?: any;
  total: Observable<number>;
  page: any = 1;
  deleteId: any;
  questionPools: QuestionPoolForListModel[];
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  constructor(private adminSrv: AdminService,
              private translateSrv: TranslateService,
              private router: Router) {
  }

  ngOnInit() {
    // this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'O rders', active: true }];

    // fetch data
    this.adminSrv.getAllQuestionPools().subscribe( x=> {
      this.questionPools = x;
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
    this.adminSrv.deleteQuestionPoolById(this.deleteId).subscribe(x=> {
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
    this.router.navigate(['admin/question-pool-editor', id])
  }

  // pagination
  pagechanged(event: any) {
    // const startItem = (event.page - 1) * event.itemsPerPage;
    // this.enditem = event.page * event.itemsPerPage;
    // this.orderlist = this.orderlist.slice(startItem, this.enditem)
  }
}
