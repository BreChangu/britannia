import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements OnInit, OnDestroy {
  
  // Palabras que van a rotar
  words: string[] = ['Negocios', 'Viajar', 'el Futuro', 'Ti'];
  currentWord = signal(this.words[0]);
  currentIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startAnimation() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.words.length;
      this.currentWord.set(this.words[this.currentIndex]);
    }, 2500); // Cambia cada 2.5 segundos
  }
}