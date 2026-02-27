import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero";
import { TestimonialsComponent } from '../../components/testimonials/testimonials';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent,TestimonialsComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
