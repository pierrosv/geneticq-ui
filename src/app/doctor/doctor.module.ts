import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ModalModule} from "ngx-bootstrap/modal";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {UIModule} from "../shared/ui/ui.module";
import {UiSwitchModule} from "ngx-ui-switch";
import {AccordionModule} from "ngx-bootstrap/accordion";
import { DoctorRoutingModule } from './doctor-routing.module';
import {PatientListComponent} from "./patients/patient-list/patient-list.component";
import {PatientEditorComponent} from "./patients/patient-editor/patient-editor.component";


@NgModule({
  declarations: [
    PatientListComponent,
    PatientEditorComponent],
  imports: [
    CommonModule,
    ModalModule,
    ReactiveFormsModule,
    TranslateModule,
    UIModule,
    UiSwitchModule,
    AccordionModule,
    DoctorRoutingModule
  ]
})
export class DoctorModule { }
