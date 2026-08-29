import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  isDark = signal(false);
  currentUrl = signal('');

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.currentUrl.set(e.urlAfterRedirects);
    });
  }

  isAuthPage() {
    const url = this.currentUrl();
    return url.includes('/login') || url.includes('/register');
  }

  toggleTheme() {
    this.isDark.update(d => !d);
    document.documentElement.setAttribute(
      'data-theme',
      this.isDark() ? 'dark' : 'light'
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}