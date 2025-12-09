import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar";
import {  HeroComponent } from "./components/hero/hero";
import { Footer } from './components/footer/footer';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,HeroComponent,Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('britannia');
}
