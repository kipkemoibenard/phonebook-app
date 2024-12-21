import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = new BehaviorSubject<boolean>(false);

  isDarkMode$ = this.darkMode.asObservable();

  constructor() { }

  toggleDarkMode() {
    this.darkMode.next(!this.darkMode.value);
    localStorage.setItem('darkMode', this.darkMode.value.toString());
    this.updateBodyClass();
  }

  initializeTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      this.darkMode.next(savedTheme === 'true');
    }
    this.updateBodyClass();
  }

  private updateBodyClass() {
    if (this.darkMode.value) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
