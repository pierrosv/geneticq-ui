import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from "rxjs";
import {ModalDirective} from "ngx-bootstrap/modal";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {PatientForListModel} from "../../../core/models/patient";
import {DoctorService} from "../../../core/services/doctor.service";
import {AuthenticationService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  enditem: any
  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;
  content?: any;
  total: Observable<number>;
  page: any = 1;
  deleteId: any;
  patients: PatientForListModel[];
  @ViewChild('removeItemModal', {static: false}) removeItemModal?: ModalDirective;

  constructor(private doctorSrv: DoctorService,
              private authSrv: AuthenticationService,
              private translateSrv: TranslateService,
              private router: Router) {
  }

  ngOnInit() {
    let doctorId = this.authSrv.getCurrentUserProfile.id;
    this.doctorSrv.getAllPatients(doctorId).subscribe(x => {
      this.patients = x;
      console.log(x);
    });
  }

  confirm(id: any) {
    this.deleteId = id
    console.log('1');
    this.removeItemModal.show();
  }

  deleteRecord() {
    this.removeItemModal.hide();
    this.doctorSrv.deletePatientById(this.deleteId).subscribe(x => {
      if (x) {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_DELETED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_DELETED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: this.translateSrv.instant('GENERIC.UNABLE_TO_DELETE'),
          text: this.translateSrv.instant('GENERIC.UNABLE_TO_DELETE'),
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
    this.router.navigate(['doctor/patient-editor', id])
  }

  // pagination
  pagechanged(event: any) {
    // const startItem = (event.page - 1) * event.itemsPerPage;
    // this.enditem = event.page * event.itemsPerPage;
    // this.orderlist = this.orderlist.slice(startItem, this.enditem)
  }

}
