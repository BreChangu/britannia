import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NosotrosComponent } from './pages/nosotros/nosotros';
import { Cursos } from './pages/cursos/cursos';
import { Contacto } from './pages/contacto/contacto';
import { PlanEstudiosComponent } from './pages/plan-estudios/plan-estudios';
export const routes: Routes = [
  { 
    path: '', 
    component: Home, 
    title: 'Britannia | Escuela de Inglés Online y Presencial' 
  },
  { 
    path: 'nosotros', 
    component: NosotrosComponent, 
    title: 'Nuestra Metodología y Filosofía | Britannia' 
  },
  { 
    path: 'cursos', 
    component: Cursos, 
    title: 'Cursos de Inglés: Kids, Teens & Business | Britannia' 
  },
  { 
    path: 'contacto', 
    component: Contacto, 
    title: 'Inscripciones y Contacto | Britannia' 
  },
  
  // --- RUTA INDEPENDIENTE (Mejor para SEO y UX) ---
  { 
    path: 'plan-estudios', 
    redirectTo: 'plan-estudios/a1', 
    pathMatch: 'full' 
  },
  { 
    path: 'plan-estudios/:nivel', 
    component: PlanEstudiosComponent 
  },

  { path: '**', redirectTo: '' }
];