import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PortfolioDataService, Project } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('cardList', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(30px) scale(0.97)' }),
          stagger(80, [
            animate('400ms cubic-bezier(0.34,1.56,0.64,1)',
              style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <section id="projects" class="section">
      <div class="container">

        <div class="section-header reveal">
          <p class="section-label mono accent-text">04. Projects</p>
          <h2 class="section-title">Things I've <span class="accent">Built</span></h2>
          <p class="section-subtitle">
            A selection of production projects across fintech, healthcare, and platform engineering.
          </p>
        </div>

        <!-- Category filter -->
        <div class="filter-row reveal" style="transition-delay:0.1s">
          @for (cat of categories; track cat) {
            <button
              class="filter-tab"
              [class.active]="activeFilter() === cat"
              (click)="activeFilter.set(cat)">
              {{ cat }}
            </button>
          }
        </div>

        <!-- Featured projects (big cards) -->
        @if (activeFilter() === 'All' || activeFilter() === 'Featured') {
          <div class="featured-grid" [@cardList]="activeFilter()">
            @for (project of featuredProjects(); track project.id) {
              <div class="featured-card glass-card reveal">
                <!-- Card glow accent -->
                <div class="card-accent-line"></div>

                <div class="featured-content">
                  <div class="project-top">
                    <div class="project-category-badge">{{ project.category }}</div>
                    @if (project.featured) {
                      <span class="featured-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                        Featured
                      </span>
                    }
                  </div>

                  <h3 class="project-title">{{ project.title }}</h3>
                  <p class="project-desc">{{ project.description }}</p>

                  @if (project.metrics) {
                    <div class="metrics-row">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/></svg>
                      <span class="mono" style="font-size:0.78rem; color: var(--accent-primary)">{{ project.metrics }}</span>
                    </div>
                  }

                  <div class="tech-tags">
                    @for (tech of project.tech; track tech) {
                      <span class="tag">{{ tech }}</span>
                    }
                  </div>

                  <div class="project-links">
                    @if (project.github) {
                      <a [href]="project.github" target="_blank" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                        GitHub
                      </a>
                    }
                    @if (project.live) {
                      <a [href]="project.live" target="_blank" class="project-link project-link-live">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                        Live Demo
                      </a>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        }

        <!-- Other projects (small cards) -->
        <div class="other-grid" [@cardList]="activeFilter()">
          @for (project of otherProjects(); track project.id) {
            <div class="other-card glass-card reveal">
              <div class="other-top">
                <div class="folder-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
                </div>
                <div class="other-links">
                  @if (project.github) {
                    <a [href]="project.github" target="_blank" class="icon-link" aria-label="GitHub">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    </a>
                  }
                  @if (project.live) {
                    <a [href]="project.live" target="_blank" class="icon-link" aria-label="Live">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                    </a>
                  }
                </div>
              </div>
              <h3 class="other-title">{{ project.title }}</h3>
              <p class="other-desc">{{ project.description }}</p>
              <div class="other-techs">
                @for (t of project.tech.slice(0,4); track t) {
                  <span class="mono" style="font-size:0.72rem; color: var(--text-muted)">{{ t }}</span>
                }
              </div>
            </div>
          }
        </div>

      </div>
    </section>
  `,
  styles: [`
    .section-header { margin-bottom: 40px; }

    .section-label { font-size: 0.85rem; letter-spacing: 0.1em; margin-bottom: 12px; display: block; }

    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin-bottom: 16px;
      .accent { color: var(--accent-primary); }
    }

    /* Filter */
    .filter-row {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 48px;
    }

    .filter-tab {
      padding: 7px 18px;
      border-radius: 100px;
      border: 1px solid var(--border-medium);
      background: transparent;
      color: var(--text-secondary);
      font-family: var(--font-body);
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 200ms ease;

      &:hover { border-color: var(--accent-border); color: var(--accent-primary); background: var(--accent-muted); }
      &.active { background: var(--accent-primary); border-color: var(--accent-primary); color: #000; font-weight: 700; }
    }

    /* Featured grid */
    .featured-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
      margin-bottom: 40px;

      @media (max-width: 480px) { grid-template-columns: 1fr; }
    }

    .featured-card {
      padding: 28px;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .card-accent-line {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
      opacity: 0;
      transition: opacity 300ms ease;
    }

    .featured-card:hover .card-accent-line { opacity: 1; }

    .featured-content { display: flex; flex-direction: column; gap: 14px; height: 100%; }

    .project-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .project-category-badge {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--accent-primary);
      background: var(--accent-muted);
      border: 1px solid var(--accent-border);
      border-radius: 100px;
      padding: 3px 10px;
      letter-spacing: 0.05em;
    }

    .featured-badge {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 0.7rem;
      font-family: var(--font-mono);
      color: #facc15;
      background: rgba(250,204,21,0.08);
      border: 1px solid rgba(250,204,21,0.25);
      border-radius: 100px;
      padding: 3px 10px;
    }

    .project-title {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.3;
    }

    .project-desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.75;
      flex: 1;
    }

    .metrics-row {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--accent-primary);
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .project-links {
      display: flex;
      gap: 12px;
      margin-top: auto;
      padding-top: 4px;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-secondary);
      text-decoration: none;
      padding: 6px 14px;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      transition: all 200ms ease;

      &:hover { color: var(--accent-primary); border-color: var(--accent-border); background: var(--accent-muted); }

      &-live {
        color: var(--accent-primary);
        border-color: var(--accent-border);
        background: var(--accent-muted);

        &:hover { background: var(--accent-primary); color: #000; }
      }
    }

    /* Other projects */
    .other-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 18px;

      @media (max-width: 480px) { grid-template-columns: 1fr; }
    }

    .other-card {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;

      &:hover .folder-icon { color: var(--accent-primary); transform: translateY(-3px); }
    }

    .other-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .folder-icon {
      color: var(--text-muted);
      transition: all 250ms ease;
    }

    .other-links {
      display: flex;
      gap: 10px;
    }

    .icon-link {
      color: var(--text-muted);
      transition: color 150ms ease;

      &:hover { color: var(--accent-primary); }
    }

    .other-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.3;
    }

    .other-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.7;
      flex: 1;
    }

    .other-techs {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }
  `]
})
export class ProjectsComponent {
  constructor(public data: PortfolioDataService) {}

  activeFilter = signal('All');

  categories = ['All', 'Featured', 'Backend', 'FinTech', 'Healthcare', 'Open Source', 'Infrastructure', 'DevOps'];

  featuredProjects = computed(() => {
    const f = this.activeFilter();
    return this.data.projects.filter(p =>
      p.featured && (f === 'All' || f === 'Featured' || p.category === f)
    );
  });

  otherProjects = computed(() => {
    const f = this.activeFilter();
    if (f === 'Featured') return [];
    return this.data.projects.filter(p =>
      !p.featured && (f === 'All' || p.category === f)
    );
  });
}
