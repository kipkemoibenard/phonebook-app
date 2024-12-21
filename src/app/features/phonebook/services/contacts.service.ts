import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/phonebook';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

baseUrl = 'http://localhost:3000'

  constructor(
    private http: HttpClient
  ) { }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.baseUrl}/contacts`);
  }

  getContactDetailsById(contactId: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/contacts/${contactId}`);
  }

  updateContact(contact: Contact): Observable<Contact> {
    const url = `${this.baseUrl}/contacts/${contact.id}`;
    return this.http.put<Contact>(url, contact);
  }

  markAsDeleted(contactDetails: any): Observable<any> {
    const contactId = contactDetails.id;
    return this.http.put(`${this.baseUrl}/contacts/${contactId}`, contactDetails);
  }

  // Use PATCH to update a single field
  updateFavorite(contactId: number, isFavorite: boolean): Observable<Contact> {
    const url = `${this.baseUrl}/contacts/${contactId}`;
    const updateData = { is_favorite: isFavorite };
    return this.http.patch<Contact>(url, updateData);
  }
}
