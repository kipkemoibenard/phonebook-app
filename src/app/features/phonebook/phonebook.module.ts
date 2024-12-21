import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhonebookRoutingModule } from './phonebook-routing.module';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteContactsComponent } from './components/favorite-contacts/favorite-contacts.component';


@NgModule({
  declarations: [
    ContactListComponent,
    ContactDetailsComponent,
    FavoriteContactsComponent
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
