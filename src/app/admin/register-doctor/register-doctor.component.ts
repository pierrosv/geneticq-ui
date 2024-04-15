import {Component, OnInit} from '@angular/core';
import {DoctorModel} from "../../core/models/application-user";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AdminService} from "../../core/services/admin.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-doctor',
  templateUrl: './register-doctor.component.html',
  styleUrls: ['./register-doctor.component.css']
})
export class RegisterDoctorComponent  implements OnInit {
  id: number;
  action: string;
  doctor: DoctorModel;
  programTypeForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
              private adminSrv: AdminService,
              private router: Router) {
  }

  ngOnInit() {
    this.action = this.translateSrv.instant('GENERIC.REGISTER_DOCTOR');
    /**
     * Form Validation
     */
    this.programTypeForm = this.formBuilder.group({
      id: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      mobilePhone: [''],
      specialty: [''],
      subscribedOn: [''],
      subscriptionEndsAt: [''],
      workPhone: [''],
      email: [''],
    });
    this.adminSrv.getDoctorById(this.id).subscribe(x=> {
      this.doctor = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.programTypeForm.patchValue({email: this.doctor.email});
    this.programTypeForm.patchValue({firstName: this.doctor.firstName});
    this.programTypeForm.patchValue({lastName: this.doctor.lastName});
    this.programTypeForm.patchValue({mobilePhone: this.doctor.mobilePhone});
    this.programTypeForm.patchValue({workPhone: this.doctor.workPhone});
    this.programTypeForm.patchValue({specialty: this.doctor.specialty});
    this.programTypeForm.patchValue({subscribedOn: this.doctor.subscribedOn});
    this.programTypeForm.patchValue({subscriptionEndsAt: this.doctor.subscriptionEndsAt});
  }

  save() {
    if (this.programTypeForm.valid) {
      let doctor = new DoctorModel();
      doctor.id = -1;
      doctor.email = this.programTypeForm.get('email')?.value;
      doctor.firstName = this.programTypeForm.get('firstName')?.value;
      doctor.lastName = this.programTypeForm.get('lastName')?.value;
      doctor.mobilePhone = this.programTypeForm.get('mobilePhone')?.value;
      doctor.workPhone = this.programTypeForm.get('workPhone')?.value;
      doctor.specialty = this.programTypeForm.get('specialty')?.value;
      doctor.subscribedOn = this.programTypeForm.get('subscribedOn')?.value;
      doctor.subscriptionEndsAt = this.programTypeForm.get('subscriptionEndsAt')?.value;

      if (this.id > 0 ) {
        doctor.id = this.id;
      }

      this.adminSrv.registerDoctor(doctor).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['admin/doctor-list']);
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
