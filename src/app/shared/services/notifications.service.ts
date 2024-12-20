import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; 

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  success(message: string) {
    this.toastr.success(message, 'Success', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      toastClass: 'bg-green-500 text-white rounded-lg shadow-lg p-4 flex items-center space-x-2',
    });
  }

  error(message: string) {
    this.toastr.error(message, 'Error', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right', // Position to the top-right corner
      toastClass: 'bg-red-500 text-white rounded-lg shadow-lg p-4 flex items-center space-x-2',
    });
  }

  failure(message: string) {
    this.toastr.warning(message, 'Warning', {
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right', // Position to the top-right corner
      toastClass: 'bg-yellow-500 text-black rounded-lg shadow-lg p-4 flex items-center space-x-2',
    });
  }
}
