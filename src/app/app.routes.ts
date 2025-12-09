import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Nosotros} from './pages/nosotros/nosotros';
import { Cursos } from './pages/cursos/cursos';
import { Contacto } from './pages/contacto/contacto';


export const routes: Routes = [
  { 
    path: '', 
    component: Home, 
    title: 'Britannia | Escuela de Inglés Online y Presencial' 
  },
  { 
    path: 'nosotros', 
    component: Nosotros, 
    title: 'Nuestra Metodología y Teachers | Britannia' 
  },
  { 
    path: 'cursos', 
    component: Cursos, // O ServiciosComponent
    title: 'Cursos de Inglés: Kids, Teens & Business | Britannia' 
  },
  { 
    path: 'contacto', 
    component: Contacto, 
    title: 'Inscripciones y Contacto | Britannia' 
  },
  { path: '**', redirectTo: '' }
];