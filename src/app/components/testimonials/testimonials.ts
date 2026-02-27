import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class TestimonialsComponent implements OnInit {
  
  testimonials = signal<any[]>([]);
  
  // 1. NUEVO: Señal para controlar si mostramos todas o solo 6
  showAllReviews = signal(false);

  // 2. ACTUALIZADO: La vista computada ahora reacciona al botón "Ver todas"
  displayedTestimonials = computed(() => {
    if (this.showAllReviews()) {
      return this.testimonials(); // Muestra todas
    }
    return this.testimonials().slice(0, 6); // Muestra solo 6
  });

  // Base de datos original con una RESPUESTA DEL PROPIETARIO de ejemplo
  private defaultReviews = [
    { 
      name: 'Maca López', 
      date: '27 Nov 2025', 
      text: 'I really recommend this academy! She taught me English in Germany when I was preparing for my IELTS... You\'ll be in the best hands! 🙌✨', 
      avatar: 'https://ui-avatars.com/api/?name=Maca+Lopez&background=005151&color=fff', 
      source: 'facebook', 
      url: '#',
      // 👇 NUEVO: Respuesta del negocio 👇
      ownerReply: '¡Muchas gracias por tus palabras, Maca! Fue un verdadero honor acompañarte en tu preparación para el IELTS. Nos llena de orgullo saber que lograste tu meta en Australia. ¡Un abrazo de parte de toda la familia Britannia!'
    },
    { name: 'Ana Cruz', date: '8 Sept 2025', text: 'Recomiendo ampliamente a Britania Learning, especialmente gracias a la excelente labor de la maestra Dana...', avatar: 'https://ui-avatars.com/api/?name=Ana+Cruz&background=CF6F77&color=fff', source: 'facebook', url: '#' },
    { name: 'Dakiru Tellez Hernandez', date: '30 Jun 2025', text: 'Una excelente maestra, que explica con detalle el tema para que no te quedes con dudas. muy buena docente', avatar: 'https://ui-avatars.com/api/?name=Dakiru+Tellez&background=008f8f&color=fff', source: 'facebook', url: '#' },
    { name: 'Sarahi Gonzalez', date: '22 Jun 2025', text: 'ampliamente recomendable! con clases personalizadas y muy dinámicas. Mi hijo ha aprendido mucho! La maestra Dana es excelente!!', avatar: 'https://ui-avatars.com/api/?name=Sarahi+Gonzalez&background=005151&color=fff', source: 'facebook', url: '#' },
    { name: 'Ileana Segovia', date: '21 Jun 2025', text: '¡Recomiendo ampliamente Britania Learning Center! Siempre tuvieron un trato muy amable y profesional...', avatar: 'https://ui-avatars.com/api/?name=Ileana+Segovia&background=CF6F77&color=fff', source: 'facebook', url: '#' },
    { name: 'Luis Ángel Soto', date: '8 Jun 2025', text: 'Plan muy completo para diferentes enfoques de estudio. Recomiendo la escuela.', avatar: 'https://ui-avatars.com/api/?name=Luis+Angel&background=008f8f&color=fff', source: 'facebook', url: '#' },
    { name: 'Eli Takumi Zamora', date: '22 Feb 2023', text: 'Muy buena escuela, cuenta con un plan muy dinámico para aprender idiomas', avatar: 'https://ui-avatars.com/api/?name=Eli+Takumi&background=005151&color=fff', source: 'facebook', url: '#' }
  ];

  ngOnInit() { this.loadReviews(); }

  loadReviews() {
    const saved = localStorage.getItem('britannia_reviews');
    if (saved) { this.testimonials.set(JSON.parse(saved)); } 
    else { this.testimonials.set(this.defaultReviews); }
  }

  // 3. NUEVO: Función para alternar el botón de "Ver todas"
  toggleShowAll() {
    this.showAllReviews.update(val => !val);
  }

  // --- Lógica del Modal (Se mantiene igual) ---
  showReviewModal = signal(false);
  isLoggedInGoogle = signal(false);
  newReview = signal({ name: 'Tu Nombre (Vía Google)', avatar: 'https://i.pravatar.cc/150?img=68', text: '', rating: 5 });

  openModal() { this.showReviewModal.set(true); document.body.style.overflow = 'hidden'; }
  closeModal() {
    this.showReviewModal.set(false);
    setTimeout(() => {
      this.isLoggedInGoogle.set(false);
      this.newReview.set({ name: 'Tu Nombre (Vía Google)', avatar: 'https://i.pravatar.cc/150?img=68', text: '', rating: 5 });
    }, 400);
    document.body.style.overflow = 'auto';
  }

  simulateGoogleLogin() { setTimeout(() => { this.isLoggedInGoogle.set(true); }, 800); }
  setRating(stars: number) { this.newReview.update(review => ({ ...review, rating: stars })); }

  submitReview() {
    const reviewData = this.newReview();
    if (!reviewData.text.trim()) return;

    const newEntry = {
      name: reviewData.name,
      date: 'Hoy',
      text: reviewData.text,
      avatar: reviewData.avatar,
      source: 'google',
      url: '#'
    };

    this.testimonials.update(list => {
      const updatedList = [newEntry, ...list];
      localStorage.setItem('britannia_reviews', JSON.stringify(updatedList));
      return updatedList;
    });
    this.closeModal();
  }
}