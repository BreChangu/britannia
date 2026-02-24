import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private renderer: Renderer2;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  // 1. Actualizar Título y Meta Tags básicos
  setStandardMeta(title: string, description: string) {
    this.titleService.setTitle(`${title} | Britannia`);
    this.metaService.updateTag({ name: 'description', content: description });
    
    // Open Graph para que se vea bien al compartir en WhatsApp/Facebook
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }

  // 2. Inyectar Datos Estructurados (Rich Snippets / JSON-LD)
  setStructuredData(schemaData: any) {
    // Primero, limpiamos el script anterior si el usuario cambió de ruta
    const existingScript = this.document.getElementById('structured-data');
    if (existingScript) {
      this.renderer.removeChild(this.document.head, existingScript);
    }

    // Creamos un nuevo script para la página actual
    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'structured-data';
    script.text = JSON.stringify(schemaData);

    // Lo añadimos al <head> del HTML
    this.renderer.appendChild(this.document.head, script);
  }
}