import {Component, OnInit} from '@angular/core';
import {AdminModel} from "../../core/models/application-user";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AdminService} from "../../core/services/admin.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent  implements OnInit {
  id: number;
  action: string;
  administrator: AdminModel;
  programTypeForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private translateSrv: TranslateService,
              private adminSrv: AdminService,
              private router: Router) {
  }

  ngOnInit() {
    this.action = this.translateSrv.instant('GENERIC.REGISTER_ADMIN');
    /**
     * Form Validation
     */
    this.programTypeForm = this.formBuilder.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobilePhone: [''],
      workPhone: [''],
      email: [''],
    });

    this.adminSrv.getAdminById(this.id).subscribe(x=> {
      this.administrator = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.programTypeForm.patchValue({email: this.administrator.email});
    this.programTypeForm.patchValue({firstName: this.administrator.firstName});
    this.programTypeForm.patchValue({lastName: this.administrator.lastName});
    this.programTypeForm.patchValue({mobilePhone: this.administrator.mobilePhone});
    this.programTypeForm.patchValue({workPhone: this.administrator.workPhone});
  }

  save() {
    if (this.programTypeForm.valid) {
      let admin = new AdminModel();
      admin.id = -1;
      admin.email = this.programTypeForm.get('email')?.value;
      admin.firstName = this.programTypeForm.get('firstName')?.value;
      admin.lastName = this.programTypeForm.get('lastName')?.value;
      admin.mobilePhone = this.programTypeForm.get('mobilePhone')?.value;
      admin.workPhone = this.programTypeForm.get('workPhone')?.value;

      if (this.id > 0 ) {
        admin.id = this.id;
      }

      this.adminSrv.registerAdmin(admin).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['admin/admin-list']);
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
