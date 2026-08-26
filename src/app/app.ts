import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  auth = inject(AuthService);
  private router = inject(Router);

  isDark = signal(false);
  isAuthPage = signal(false);

  ngOnInit() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      this.isDark.set(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      const authRoutes = ['/login', '/register', '/unauthorized'];
      this.isAuthPage.set(authRoutes.some(r => e.url.startsWith(r)));
    });
  }

  toggleTheme() {
    this.isDark.update(v => !v);
    const theme = this.isDark() ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}