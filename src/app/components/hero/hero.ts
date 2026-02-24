import { Component, OnInit, OnDestroy, signal, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  // Importamos RouterLink para los botones de acción
  imports: [CommonModule, RouterLink], 
  templateUrl: './hero.html',
  standalone: true,
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  
  // Palabras que van a rotar
  words: string[] = ['Negocios', 'Viajar', 'el Futuro', 'Ti'];
  currentWord = signal(this.words[0]);
  currentIndex = 0;
  
  // QA: Evitamos el uso de 'any' aplicando el tipado correcto de TypeScript para Node/Browser
  intervalId: ReturnType<typeof setInterval> | undefined;

  // Inyectamos PLATFORM_ID para saber si estamos en el Servidor (SEO) o en el Navegador del usuario
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // QA: Regla de oro para SSR -> Las animaciones de tiempo solo corren en el navegador
    if (isPlatformBrowser(this.platformId)) {
      this.startAnimation();
    }
  }

  ngOnDestroy() {
    // Limpiamos la memoria cuando el usuario cambia de página
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startAnimation() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.currentWord.set(this.words[this.currentIndex]);
    }, 2500); // Cambia cada 2.5 segundos
  }
}