import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/phonebook';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  selectedSortField: keyof Contact = 'first_name'; // Ensure this is typed correctly
  selectedSortDirection: 'asc' | 'desc' = 'asc'; // Default sorting direction
  isGridView: boolean = true; // Default to grid view

  constructor(
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllContacts();
  }

  ngOnDestroy(): void {}

  /**
   * The function `getAllContacts` retrieves all contacts from a service and assigns them to a
   * component property.
   */
  getAllContacts() {
    this.contactService.getAllContacts().subscribe((res: Contact[]) => {
      this.contacts = res;
    });
  }

  toggleView() {
    this.isGridView = !this.isGridView; // Toggle between grid and list views
  }

  onContactClick(contactId: number): void {
    console.log(contactId)
    // Navigate to the contact details page with the contact's ID
    this.router.navigate(['/phonebook/contact-details', contactId]);
  }
}
