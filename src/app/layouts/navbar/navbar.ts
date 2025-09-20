import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly auth = inject(Auth);

  @Input() isLogin: boolean = true;
  isMobileMenuOpen = false;

  signOut(): void {
    this.auth.LogOut();
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    // Update DOM classes for mobile menu visibility
    const mobileMenu = document.getElementById('navbar-mobile');
    if (mobileMenu) {
      if (this.isMobileMenuOpen) {
        mobileMenu.classList.add('show');
      } else {
        mobileMenu.classList.remove('show');
      }
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;

    // Ensure mobile menu is hidden
    const mobileMenu = document.getElementById('navbar-mobile');
    if (mobileMenu) {
      mobileMenu.classList.remove('show');
    }
  }

  navigateAndClose(): void {
    // Close mobile menu when navigating on mobile
    this.closeMobileMenu();
  }
}
