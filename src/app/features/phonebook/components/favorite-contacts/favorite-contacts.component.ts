import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contact } from '../../models/phonebook';
import { NotificationService } from 'src/app/shared/services/notifications.service';

@Component({
  selector: 'app-favorite-contacts',
  templateUrl: './favorite-contacts.component.html',
  styleUrls: ['./favorite-contacts.component.css']
})
export class FavoriteContactsComponent implements OnInit, OnDestroy {
  favoriteContacts: Contact[] = [];

  constructor(
    private contactsService: ContactsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getFavoriteContacts();
  }

  ngOnDestroy(): void {
    
  }

  getFavoriteContacts() {
    this.contactsService.getAllContacts().subscribe((res: Contact[]) => {
      this.favoriteContacts = res.filter(favContact => favContact.is_favorite === true);
    });
  }

  toggleFavorite(contact: Contact): void {
    const updatedFavoriteStatus = !contact.is_favorite;  // Toggle the current status
    this.contactsService.updateFavorite(contact.id, updatedFavoriteStatus).subscribe((res) => {
        contact.is_favorite = updatedFavoriteStatus;
        this.getFavoriteContacts();
      },
      (error) => {
        this.notificationService.error('Error updating favorite status');
      }
    );
  }

}
