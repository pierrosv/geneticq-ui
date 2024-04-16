import {Component, OnInit} from '@angular/core';
import {DoctorModel} from "../../core/models/application-user";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import { Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AdminService} from "../../core/services/admin.service";
import Swal from "sweetalert2";
import {AuthenticationService} from "../../core/services/auth.service";
import {DoctorService} from "../../core/services/doctor.service";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.css']
})
export class DoctorProfileComponent  implements OnInit {
  id: number;
  action: string;
  doctor: DoctorModel;
  programTypeForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private authService: AuthenticationService,
              private translateSrv: TranslateService,
              private doctorSrv: DoctorService,
              private router: Router) {
  }

  ngOnInit() {
    this.action = this.translateSrv.instant('GENERIC.PROFILE.EDIT');
    this.id = this.authService.getCurrentUserProfile.id;
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
    console.log(this.id);
    console.log(this.authService.getCurrentUserProfile);

    this.doctorSrv.getDoctorById(this.id).subscribe(x=> {
      this.doctor = x;
      this.patchForm();
    });
  }

  patchForm() {
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
      if (this.id > 0 ) {
        doctor.id = this.id;
      }

      this.doctorSrv.saveDoctor(doctor).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['/']);
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
