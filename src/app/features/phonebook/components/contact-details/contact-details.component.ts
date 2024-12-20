import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/phonebook';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  contactId!: number;
  contactDetails: Contact | null = null;
  isEditModalOpen: boolean = false;
  editContactData!: Contact;
  contactDetailsForm!: FormGroup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getContactDetailsById();
    this.createContactDetailsForm();
  }

  ngOnDestroy(): void {
    
  }

  getParams() {
    this.contactId = this.activatedRoute.snapshot.params['id'];
  }

  createContactDetailsForm() {
    this.contactDetailsForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: [
        '',
        [
          Validators.required, 
          Validators.pattern(/^\+?\d+$/), // Ensure the phone number is numeric and optionally starts with a '+'
          Validators.minLength(10), // Ensure the phone number has at least 10 characters
          Validators.maxLength(13) // Ensure the phone number doesn't exceed 13 characters
        ]
      ],
      physical_address: ['', Validators.required],
    });
  }

  /**
   * The function `getContactDetailsById` retrieves contact details by ID and assigns the result to
   * `contactDetails`.
   */
  getContactDetailsById() {
    this.contactsService.getContactDetailsById(this.contactId).subscribe((res: Contact) => {
      this.contactDetails = res;
    });
  }

  openEditModal(client: Contact): void {
    this.isEditModalOpen = true;
    this.contactDetailsForm.patchValue({
      first_name: client.first_name || '',
      last_name: client.last_name || '',
      email: client.email || '',
      phone_number: client.phone_number || '',
      physical_address: client.physical_address || '',
    });
  }

  updateContact(): void {
    if (this.contactDetailsForm.valid) {
      const updatedContact = {
        ...this.contactDetailsForm.value,
        id: this.contactId,
        is_deleted: false
      };
      this.contactsService.updateContact(updatedContact).subscribe((updatedData) => {
            this.contactDetails = updatedData;
            this.closeEditModal();
            this.notificationService.success('Updated!')
          });
    } else {
      this.notificationService.error('Something happened!')
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  // Delete Contact Logic without actual delete method call
  deleteContact(): void {
    if (!this.contactDetails) {
      this.notificationService.failure('No contact to delete!');
      return;
    }
  
    const isConfirmed = window.confirm('Are you sure you want to delete this contact?');
  
    if (isConfirmed) {
      this.contactDetails.is_deleted = true;
  
      this.contactsService.markAsDeleted(this.contactDetails).subscribe(
        () => {
          this.notificationService.success('Contact deleted');
          this.router.navigate(['/phonebook/contact-list']);
        },
        (error) => {
          this.notificationService.error('Error deleting contact!');
        }
      );
    }
  }
   

  /**
   * The `goBack` function navigates the user back to the contact list page in a phonebook application.
   */
  goBack(): void {
    this.router.navigate(['/phonebook/contact-list']);
  }

}
