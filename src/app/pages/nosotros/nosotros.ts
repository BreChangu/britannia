import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser'; // <-- 1. Importamos el arsenal SEO

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class NosotrosComponent implements OnInit {

  constructor(private metaService: Meta) {} // <-- 2. Lo inyectamos

  ngOnInit() {
    // 3. Le decimos a Google de qué trata esta página
    this.metaService.updateTag({ 
      name: 'description', 
      content: 'Conoce la filosofía de Britannia Learning Center. Aprende inglés con profesores certificados, grupos reducidos y un método 100% conversacional.' 
    });
  }
}