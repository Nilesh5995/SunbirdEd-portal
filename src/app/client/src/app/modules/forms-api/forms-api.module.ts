import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { FormsApiRoutingModule } from './forms-api-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormsListComponent } from './components/forms-list/forms-list.component';
import { CommonFormElementsModule } from 'common-form-elements';

@NgModule({
  declarations: [CreateFormComponent, FormsListComponent],
  imports: [
    CommonModule,
    FormsApiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFormElementsModule

  ]
})
export class FormsApiModule { }
