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
  filteredContacts: Contact[] = [];
  selectedSortField: keyof Contact = 'first_name'; // Ensure this is typed correctly
  selectedSortDirection: 'asc' | 'desc' = 'asc'; // Default sorting direction
  isGridView: boolean = true; // Default to grid view
  searchTerm: string = '';

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
      this.filteredContacts = res;
    });
  }

  onSearchChange(): void {
    this.filterContacts();
  }

  filterContacts(): void {
    if (!this.searchTerm.trim()) {
      this.filteredContacts = this.contacts;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.filteredContacts = this.contacts.filter(contact => 
        contact.first_name.toLowerCase().includes(searchTermLower) ||
        contact.last_name.toLowerCase().includes(searchTermLower) ||
        contact.phone_number.includes(searchTermLower) ||
        contact.email.includes(searchTermLower)
      );
    }
  }

  toggleView() {
    this.isGridView = !this.isGridView; // Toggle between grid and list views
  }

  onContactClick(contactId: number): void {
    // Navigate to the contact details page with the contact's ID
    this.router.navigate(['/phonebook/contact-details', contactId]);
  }

  toggleSelectAll(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.filteredContacts.forEach(contact => contact.selected = isChecked);
  }

  deleteSelected() {
    const selectedContacts = this.filteredContacts.filter(contact => contact.selected);
    if (selectedContacts.length === 0) {
      alert('No contacts selected');
      return;
    }

    if (confirm(`Are you sure you want to delete ${selectedContacts.length} contact(s)?`)) {
      this.contacts = this.contacts.filter(contact => !contact.selected);
      this.filteredContacts = this.filteredContacts.filter(contact => !contact.selected);
      // Here we can call a service to delete the contacts
    }
  }

  get hasSelectedContacts(): boolean {
    return this.filteredContacts.some(contact => contact.selected);
  }
}
