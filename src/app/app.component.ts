import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'phonebook-app';
  isDarkMode = false;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.themeService.initializeTheme();
    this.themeService.isDarkMode$.subscribe(isDark => {
      this.isDarkMode = isDark;
    });
  }

  ngOnDestroy(): void {
    
  }

  toggleTheme() {
    this.themeService.toggleDarkMode();
  }
}
