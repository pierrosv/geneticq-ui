export class PatientForListModel {
  id: number;
  byDoctorId: number;
  fullName: string;
  firstname: string;
  lastname: string;
  fatherName: string;
  motherName: string;
  socialSecurityNo: string;
  email: string;
  mobilePhone: string;
  workPhone: string;
  notes: string;
  dateOfBirth: Date;
}

export class PatientModel {
  id: number;
  byDoctorId: number;
  firstname: string;
  lastname: string;
  fatherName: string;
  motherName: string;
  middleName: string;
  socialSecurityNo: string;
  email: string;
  mobilePhone: string;
  workPhone: string;
  notes: string;
  dateOfBirth: Date;
}
