import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import Swal from "sweetalert2";
import {PatientModel} from "../../../core/models/patient";
import {DoctorService} from "../../../core/services/doctor.service";
import {AuthenticationService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-patient-editor',
  templateUrl: './patient-editor.component.html',
  styleUrls: ['./patient-editor.component.css']
})
export class PatientEditorComponent implements OnInit {
  id: number;
  action: string;
  patient: PatientModel;
  patientForm!: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private route: ActivatedRoute,
              private translateSrv: TranslateService,
              private authSrv: AuthenticationService,
              private doctorSrv: DoctorService,
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
    this.patientForm = this.formBuilder.group({
      id: [''],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      fatherName: ['', [Validators.required]],
      motherName: ['', [Validators.required]],
      socialSecurityNo: ['', [Validators.required]],
      middleName: [''],
      mobilePhone: [''],
      workPhone: [''],
      email: [''],
      dateOfBirth: [''],
      notes: [''],
    });
    this.doctorSrv.getPatientById(this.id).subscribe(x=> {
      this.patient = x;
      this.patchForm();
    });
  }

  patchForm() {
    this.patientForm.patchValue({firstname: this.patient.firstname});
    this.patientForm.patchValue({lastname: this.patient.lastname});
    this.patientForm.patchValue({fatherName: this.patient.fatherName});
    this.patientForm.patchValue({motherName: this.patient.motherName});
    this.patientForm.patchValue({middleName: this.patient.middleName});
    this.patientForm.patchValue({dateOfBirth: this.patient.dateOfBirth});
    this.patientForm.patchValue({socialSecurityNo: this.patient.socialSecurityNo});
    this.patientForm.patchValue({mobilePhone: this.patient.mobilePhone});
    this.patientForm.patchValue({workPhone: this.patient.workPhone});
    this.patientForm.patchValue({email: this.patient.email});
    this.patientForm.patchValue({notes: this.patient.notes});
  }

  save() {
    if (this.patientForm.valid) {
      let patient = new PatientModel();
      patient.id = -1;
      patient.byDoctorId = this.authSrv.getCurrentUserProfile.id;
      patient.firstname = this.patientForm.get('firstname')?.value;
      patient.lastname = this.patientForm.get('lastname')?.value;
      patient.fatherName = this.patientForm.get('fatherName')?.value;
      patient.motherName = this.patientForm.get('motherName')?.value;
      patient.middleName = this.patientForm.get('middleName')?.value;
      patient.dateOfBirth = this.patientForm.get('dateOfBirth')?.value;
      patient.socialSecurityNo = this.patientForm.get('socialSecurityNo')?.value;
      patient.mobilePhone = this.patientForm.get('mobilePhone')?.value;
      patient.workPhone = this.patientForm.get('workPhone')?.value;
      patient.email = this.patientForm.get('email')?.value;
      patient.notes = this.patientForm.get('notes')?.value;

      if (this.id > 0 ) {
        patient.id = this.id;
      }

      this.doctorSrv.savePatient(patient).subscribe( x => {
        Swal.fire({
          icon: 'success',
          title: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          text: this.translateSrv.instant('GENERIC.SUCCESSFULLY_SAVED'),
          customClass: {
            confirmButton: 'btn btn-primary'
          },
          buttonsStyling: true
        });
        this.router.navigate(['doctor/patients']);
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

