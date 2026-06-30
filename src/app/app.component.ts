import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
    ContactComponent,
    ThemeSwitcherComponent,
  ],
  template: `
    <div class="grid-bg"></div>
    <div class="noise-overlay"></div>
    <app-theme-switcher />
    <app-navbar />
    <main>
      <app-hero />
      <app-about />
      <app-skills />
      <app-projects />
      <app-experience />
      <app-contact />
    </main>
    <footer class="footer">
      <div class="container">
        <div class="footer-inner">
          <span class="mono accent-text">&lt;/&gt;</span>
          <p>Built with <span class="accent-text">Angular</span> + <span class="accent-text">TypeScript</span></p>
          <p class="footer-copy">© {{ currentYear }} Bhanu Pratap Singh</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    main { position: relative; z-index: 2; }
    .footer {
      position: relative;
      z-index: 2;
      border-top: 1px solid var(--border-subtle);
      padding: 32px 0;
      margin-top: 0;
    }
    .footer-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      font-size: 0.875rem;
      color: var(--text-muted);
      flex-wrap: wrap;
    }
    .footer-copy { color: var(--text-secondary); }
  `]
})
export class AppComponent implements OnInit {
  currentYear = new Date().getFullYear();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.init();
    this.initScrollReveal();
  }

  private initScrollReveal(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add('visible');
            }, i * 80);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 500);
  }
}
