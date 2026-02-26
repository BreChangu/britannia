import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-placement-test',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './placement-test.html',
  styleUrl: './placement-test.css'
})
export class PlacementTestComponent implements OnInit {
  // --- ESTADOS CON SIGNALS ---
  currentIndex = signal(0);
  userAnswers = signal<string[]>([]);
  testFinished = signal(false);
  showResults = signal(false);
  shuffledQuestions = signal<Question[]>([]);
  readingText = signal(`"In recent years, remote work has become increasingly common. While some employees appreciate the flexibility and improved work-life balance, others struggle with isolation and reduced collaboration. Studies suggest that productivity depends largely on personality type, management style, and the nature of the job itself. As companies experiment with hybrid models, aiming to balance autonomy with teamwork, the traditional office is being redefined."`);

  // --- BASE DE DATOS ORIGINAL (50 Preguntas) ---
  private readonly questionsDB: Question[] = [
    { id: 1, text: "Hardly ___ the meeting started when the electricity went out.", options: ["had", "has", "did", "was"], correctAnswer: "had" },
    { id: 2, text: "I ___ from Mexico.", options: ["is", "are", "am", "be"], correctAnswer: "am" },
    { id: 3, text: "I'd rather you ___ me the truth.", options: ["tell", "told", "have told", "telling"], correctAnswer: "told" },
    { id: 4, text: "She ___ two sisters.", options: ["have", "has", "had", "having"], correctAnswer: "has" },
    { id: 5, text: "The more you practice, ___ you become.", options: ["better", "the better", "best", "the best"], correctAnswer: "the better" },
    { id: 6, text: "If I ___ more time, I would travel more.", options: ["have", "had", "will have", "would have"], correctAnswer: "had" },
    { id: 7, text: "There ___ a book on the table.", options: ["are", "is", "were", "be"], correctAnswer: "is" },
    { id: 8, text: "Not until she left ___ how important she was.", options: ["I realized", "did I realize", "I did realize", "realized I"], correctAnswer: "did I realize" },
    { id: 9, text: "I don't have ___ money.", options: ["many", "much", "few", "a few"], correctAnswer: "much" },
    { id: 10, text: "She denied ___ the information.", options: ["to give", "give", "giving", "gave"], correctAnswer: "giving" },
    { id: 11, text: "We ___ English on Mondays.", options: ["study", "studies", "studied", "studying"], correctAnswer: "study" },
    { id: 12, text: "He's not used to ___ in such conditions.", options: ["work", "working", "worked", "works"], correctAnswer: "working" },
    { id: 13, text: "She is ___ than her brother.", options: ["tall", "taller", "tallest", "more tall"], correctAnswer: "taller" },
    { id: 14, text: "Under no circumstances ___ the confidential data.", options: ["you must share", "must you share", "you share", "you mustn't share"], correctAnswer: "must you share" },
    { id: 15, text: "I've lived here ___ 2018.", options: ["for", "since", "during", "from"], correctAnswer: "since" },
    { id: 16, text: "The project ___ by the manager yesterday.", options: ["completed", "was completed", "has completed", "completes"], correctAnswer: "was completed" },
    { id: 17, text: "Were I in your position, I ___ reconsider.", options: ["be", "to be", "would", "been"], correctAnswer: "would" },
    { id: 18, text: "She suggested ___ earlier.", options: ["leave", "to leave", "leaving", "left"], correctAnswer: "leaving" },
    { id: 19, text: "He asked me where I ___.", options: ["live", "lived", "am living", "have lived"], correctAnswer: "lived" },
    { id: 20, text: "The company decided to ___ the meeting.", options: ["put off", "put up", "put out", "put over"], correctAnswer: "put off" },
    { id: 21, text: "I prefer coffee ___ tea.", options: ["than", "to", "from", "over"], correctAnswer: "to" },
    { id: 22, text: "Little ___ about the consequences at the time.", options: ["they knew", "did they know", "they did know", "knew they"], correctAnswer: "did they know" },
    { id: 23, text: "She ___ TV when I called her.", options: ["watched", "watches", "was watching", "is watching"], correctAnswer: "was watching" },
    { id: 24, text: "The proposal was rejected, ___ surprised everyone.", options: ["that", "what", "which", "who"], correctAnswer: "which" },
    { id: 25, text: "He can't drive, ___?", options: ["can he", "can't he", "does he", "doesn't he"], correctAnswer: "can he" },
    { id: 26, text: "The issue is far more complex than it initially ___.", options: ["appears", "appearing", "appeared to be", "has appeared"], correctAnswer: "appeared to be" },
    { id: 27, text: "We arrived ___ the airport early.", options: ["to", "at", "in", "on"], correctAnswer: "at" },
    { id: 28, text: "Had I known earlier, I ___ differently.", options: ["would act", "would have acted", "will act", "acted"], correctAnswer: "would have acted" },
    { id: 29, text: "This is ___ interesting movie.", options: ["a", "an", "the", "-"], correctAnswer: "an" },
    { id: 30, text: "It was the ___ film I've ever seen.", options: ["more boring", "most boring", "very boring", "boring"], correctAnswer: "most boring" },
    { id: 31, text: "He's believed ___ responsible for the decision.", options: ["being", "to be", "be", "is"], correctAnswer: "to be" },
    { id: 32, text: "She's not as ___ as she used to be.", options: ["energetic", "more energetic", "most energetic", "energy"], correctAnswer: "energetic" },
    { id: 33, text: "Only after the explanation ___ the problem.", options: ["did he understand", "he understood", "understood he", "he did understand"], correctAnswer: "did he understand" },
    { id: 34, text: "The book is said ___ translated into several languages.", options: ["be", "to be", "to have been", "being"], correctAnswer: "to have been" },
    { id: 35, text: "He apologized ___ being late.", options: ["for", "about", "of", "with"], correctAnswer: "for" },
    { id: 36, text: "No sooner had we arrived ___ it started raining.", options: ["when", "than", "that", "then"], correctAnswer: "than" },
    { id: 37, text: "She speaks English fluently, ___ she lived abroad for years.", options: ["despite", "although", "because", "however"], correctAnswer: "because" },
    { id: 38, text: "I'm looking forward to ___ you soon.", options: ["see", "seeing", "seen", "saw"], correctAnswer: "seeing" },
    { id: 39, text: "She objected to ___ treated unfairly.", options: ["be", "being", "been", "have been"], correctAnswer: "being" },
    { id: 40, text: "This is ___ interesting movie I've seen this year.", options: ["the most", "most", "more", "very"], correctAnswer: "the most" },
    
    // --- READING SECTION (Adaptadas a opción múltiple del PDF) ---
    { id: 41, text: "According to the text, flexibility is appreciated by:", options: ["Management only", "Some employees", "All workers", "No one"], correctAnswer: "Some employees" },
    { id: 42, text: "What is a common struggle for remote workers?", options: ["Too much collaboration", "Isolation", "Lack of flexibility", "High salary"], correctAnswer: "Isolation" },
    { id: 43, text: "Productivity in remote work depends largely on:", options: ["Management style", "The nature of the job", "Personality type", "All of the above"], correctAnswer: "All of the above" },
    { id: 44, text: "Hybrid models aim to balance:", options: ["Salary and hours", "Autonomy and teamwork", "Home and office", "Cultures"], correctAnswer: "Autonomy and teamwork" },
    { id: 45, text: "The overall trend mentioned in the text is that remote work is:", options: ["Disappearing", "Increasingly common", "Only for managers", "Ineffective"], correctAnswer: "Increasingly common" },
    { id: 46, text: "The word 'flexibility' in the text is closest in meaning to:", options: ["Strict schedule", "Freedom to organize time", "Pressure", "Salary increase"], correctAnswer: "Freedom to organize time" },
    { id: 47, text: "The tone of the text is:", options: ["Negative", "Positive", "Balanced", "Humorous"], correctAnswer: "Balanced" },
    { id: 48, text: "The main idea of the text is that remote work:", options: ["Is always better", "Has both advantages and challenges", "Is impossible", "Is for everyone"], correctAnswer: "Has both advantages and challenges" },
    { id: 49, text: "The phrase 'depends largely on' suggests it is:", options: ["Impossible without", "Slightly influenced", "Mostly determined by", "Ignored"], correctAnswer: "Mostly determined by" },
    { id: 50, text: "Companies are experimenting with hybrid models because:", options: ["They want to save money", "They need to balance autonomy/teamwork", "They hate offices", "It is a law"], correctAnswer: "They need to balance autonomy/teamwork" }
  ];

  ngOnInit() {
    this.shuffleQuestions();
  }

  shuffleQuestions() {
    const shuffled = this.questionsDB.map(q => ({
      ...q,
      options: [...q.options].sort(() => Math.random() - 0.5)
    }));
    this.shuffledQuestions.set(shuffled);
  }

  // --- LÓGICA COMPUTADA ---
  currentQuestion = computed(() => this.shuffledQuestions()[this.currentIndex()]);
  
  progressPercent = computed(() => 
    Math.round(((this.currentIndex() + 1) / this.questionsDB.length) * 100)
  );

  grammarScore = computed(() => {
    return this.userAnswers().slice(0, 40).reduce((acc, ans, i) => 
      ans === this.questionsDB[i].correctAnswer ? acc + 1 : acc, 0);
  });

  readingScore = computed(() => {
    return this.userAnswers().slice(40, 50).reduce((acc, ans, i) => 
      ans === this.questionsDB[i + 40].correctAnswer ? acc + 1 : acc, 0);
  });

  totalScore = computed(() => this.grammarScore() + this.readingScore());

  finalLevel = computed(() => {
    const s = this.totalScore();
    if (s >= 43) return 'C1';
    if (s >= 35) return 'B2';
    if (s >= 26) return 'B1';
    if (s >= 16) return 'A2';
    return 'A1';
  });

  // --- ACCIONES ---
  selectOption(option: string) {
    const current = this.userAnswers();
    current[this.currentIndex()] = option;
    this.userAnswers.set([...current]);
  }

  nextQuestion() {
    if (this.currentIndex() < this.shuffledQuestions().length - 1) {
      this.currentIndex.update(v => v + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // AQUÍ TERMINA EL TEST Y ACTIVA EL FORMULARIO
      this.testFinished.set(true);
    }
  }

  submitLead(event: Event) {
    event.preventDefault();
    // AQUÍ TERMINA EL FORMULARIO Y MUESTRA EL RESULTADO
    this.showResults.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  restartTest() {
    this.currentIndex.set(0);
    this.userAnswers.set([]);
    this.testFinished.set(false);
    this.showResults.set(false);
    this.shuffleQuestions();
  }

  getWhatsAppLink(level: string) {
    const msg = `¡Hola Britannia! Completé mi test y obtuve nivel ${level}. ¿Me dan más info?`;
    return `https://wa.me/TUNUMERO?text=${encodeURIComponent(msg)}`;
  }
}