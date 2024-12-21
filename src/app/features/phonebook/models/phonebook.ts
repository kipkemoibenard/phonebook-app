export interface Contact {
    selected: boolean;
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    contact_image: string;
    physical_address: string;
    is_deleted: boolean;
    group: string;
    is_favorite: boolean;
  }