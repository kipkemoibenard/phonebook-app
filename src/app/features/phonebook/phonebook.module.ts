import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonebookRoutingModule } from './phonebook-routing.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';


@NgModule({
  declarations: [
    ContactListComponent,
    ContactDetailsComponent
  ],
  imports: [
    CommonModule,
    PhonebookRoutingModule
  ]
})
export class PhonebookModule { }
