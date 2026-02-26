import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

  currentYear = new Date().getFullYear();

  onSubscribe(event: Event) {
    event.preventDefault();
    // Aquí después conectaremos el API para guardar el correo
    console.log('¡Suscripción enviada!');
  }

}
