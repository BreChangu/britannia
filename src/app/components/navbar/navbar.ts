import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  isScrolled = signal(false);
  isMenuOpen = signal(false);

  // QA: Estados independientes para los menús desplegables en versión móvil
  isTestMenuOpen = signal(false);
  isAboutMenuOpen = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu() {
    this.isMenuOpen.update(val => !val);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
    this.isTestMenuOpen.set(false);
    this.isAboutMenuOpen.set(false);
  }

  // Funciones para el acordeón móvil
  toggleTestMenu() {
    this.isTestMenuOpen.update(val => !val);
  }

  toggleAboutMenu() {
    this.isAboutMenuOpen.update(val => !val);
  }
}