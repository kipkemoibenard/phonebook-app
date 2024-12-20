import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonebookRoutingModule } from './phonebook-routing.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ContactListComponent,
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    PhonebookRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PhonebookModule { }
