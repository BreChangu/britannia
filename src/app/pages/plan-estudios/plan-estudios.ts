import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

interface ModuleData {
  icon: string;
  title: string;
  isFeature?: boolean;
  featureText?: string;
  topics: string[];
}

interface LevelData {
  id: string;
  badge: string;
  title: string;
  modules: ModuleData[];
}

@Component({
  selector: 'app-plan-estudios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-estudios.html',
  styleUrl: './plan-estudios.css'
})
export class PlanEstudiosComponent implements OnInit {
  
  activeLevelId = signal<string>('a1');

  // --- BASE DE DATOS CON EL TEMARIO OFICIAL BRITANNIA ---
  curriculumData: LevelData[] = [
    {
      id: 'a1',
      badge: 'Nivel A1',
      title: 'Fundamentos del Idioma',
      modules: [
        {
          icon: '📖',
          title: 'Gramática Estructural',
          topics: [
            'Verb to be (Present & Past)',
            'Present Simple (Positive, negative & questions)',
            'Past simple regular & irregular verbs',
            'Have/has & Possessive determiners',
            'Going to (Future plans) & Would like'
          ]
        },
        {
          icon: '🗣️',
          title: 'Vocabulario Base',
          topics: [
            'The alphabet & Numbers 1-100',
            'Question words (Wh- questions)',
            'Hobbies (like/love/hate + ing)',
            'Adjectives & Adverbs of frequency',
            'Prepositions of time & Dates'
          ]
        },
        {
          icon: '💬',
          title: 'Aplicación Práctica',
          isFeature: true,
          featureText: 'Al terminar este nivel serás capaz de:',
          topics: [
            'Speaking in a shop (Compras básicas)',
            'Speak to explain problems',
            'Listening where and when',
            'Read to identify the subject'
          ]
        }
      ]
    },
    {
      id: 'a2',
      badge: 'Nivel A2',
      title: 'Desarrollo Pre-Intermedio',
      modules: [
        {
          icon: '📖',
          title: 'Gramática Intermedia',
          topics: [
            'Present Continuous vs Present Simple',
            'Comparatives & Superlatives',
            'Present perfect simple vs past simple',
            'Modals: Can, Could, Should, Have to',
            'Imperative for instructions'
          ]
        },
        {
          icon: '🗣️',
          title: 'Vocabulario y Expresión',
          topics: [
            'Countries, nationalities & Family',
            'Countable & uncountable nouns (Some, any)',
            'Fractions, percentages & dates',
            'Talk about money & The hour',
            'Collocations for a healthy lifestyle'
          ]
        },
        {
          icon: '💬',
          title: 'Aplicación Práctica',
          isFeature: true,
          featureText: 'Al terminar este nivel serás capaz de:',
          topics: [
            'Make suggestions & requests',
            'Tell a story & Give an opinion',
            'Write an e-mail & product review',
            'Speak on the phone fluently'
          ]
        }
      ]
    },
    {
      id: 'b1',
      badge: 'Nivel B1',
      title: 'Usuario Independiente',
      modules: [
        {
          icon: '📖',
          title: 'Gramática Avanzada',
          topics: [
            'Relative clauses & Passive voice',
            '1st & 2nd Conditional (Results & Hypotheses)',
            'Present perfect: just, already & yet',
            'Used to (Past habits)',
            'Ability: can vs be able to'
          ]
        },
        {
          icon: '🗣️',
          title: 'Vocabulario Complejo',
          topics: [
            'Verbs & adverbs with the same form',
            'Linkers for reasons & results',
            'Phrasal verbs & Suffixes/Prefixes',
            'Words with more than one meaning',
            'Making comparisons: as & than'
          ]
        },
        {
          icon: '💬',
          title: 'Aplicación Práctica',
          isFeature: true,
          featureText: 'Al terminar este nivel serás capaz de:',
          topics: [
            'Checking into a hotel & Ask for directions',
            'Write a formal covering letter & resume',
            'Job interview preparation',
            'Write a presentation & express opinions'
          ]
        }
      ]
    },
    {
      id: 'b2',
      badge: 'Nivel B2',
      title: 'Fluidez y Dominio',
      modules: [
        {
          icon: '📖',
          title: 'Perfeccionamiento Gramatical',
          topics: [
            'Past perfect forms & Participle clauses',
            'Using causative have & get',
            'Reported speech & Reporting verbs',
            'Present & Past modal verbs',
            'Unreal situations (Using wish and if only)'
          ]
        },
        {
          icon: '🗣️',
          title: 'Vocabulario Nativo',
          topics: [
            'American vs British accents',
            'Cognates, Synonyms & antonyms',
            'High-frequency verb collocations',
            'Compound adjectives & Vague language',
            'Phrasal verbs with "out" and "up"'
          ]
        },
        {
          icon: '💬',
          title: 'Aplicación Práctica',
          isFeature: true,
          featureText: 'Al terminar este nivel serás capaz de:',
          topics: [
            'Write a balanced opinion essay & formal report',
            'Start a conversation with a stranger',
            'Polite interrupting & Agree/Disagree strongly',
            'Listening to fluent speeches & Accents'
          ]
        }
      ]
    }
  ];

  currentLevelData = computed(() => {
    return this.curriculumData.find(level => level.id === this.activeLevelId()) || this.curriculumData[0];
  });

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nivelURL = params.get('nivel');
      if (nivelURL && ['a1', 'a2', 'b1', 'b2'].includes(nivelURL.toLowerCase())) {
        const nivelNormalizado = nivelURL.toLowerCase();
        this.activeLevelId.set(nivelNormalizado);
        this.updateSEOData(nivelNormalizado.toUpperCase());
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  private updateSEOData(nivelTexto: string) {
    this.titleService.setTitle(`Plan de Estudios ${nivelTexto} | Britannia Learning Center`);
    this.metaService.updateTag({ 
      name: 'description', 
      content: `Descubre el temario oficial para el nivel de inglés ${nivelTexto} en Britannia. Domina la gramática, vocabulario y fluidez conversacional paso a paso.` 
    });
  }

 selectLevel(level: string) {
    const nivelMinuscula = level.toLowerCase();
    this.activeLevelId.set(nivelMinuscula);
    
    // QA FIX: Ahora navegamos a la ruta raíz de plan-estudios
    this.router.navigate(['/plan-estudios', nivelMinuscula]);
  }

  getWhatsAppLink(nivelTexto: string): string {
    // ⚠️ Recuerda poner el número real aquí
    const telefono = '525591915400'; 
    const mensaje = `¡Hola Britannia! 👋 Me interesa inscribirme y conocer los costos del ${nivelTexto}. ¿Me pueden dar más información?`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    return `https://wa.me/${telefono}?text=${mensajeCodificado}`;
  }
}