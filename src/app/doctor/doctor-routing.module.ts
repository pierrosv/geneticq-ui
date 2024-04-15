import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PatientListComponent} from "./patients/patient-list/patient-list.component";
import {PatientEditorComponent} from "./patients/patient-editor/patient-editor.component";

const routes: Routes = [
  {
    path: 'patients',
    component: PatientListComponent
  },
  {
    path: 'patient-editor/:id',
    component: PatientEditorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
