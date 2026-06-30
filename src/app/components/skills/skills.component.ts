import {
  Component, OnInit, signal, computed, ElementRef, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { PortfolioDataService, Skill } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(60, [
            animate('350ms cubic-bezier(0.34,1.56,0.64,1)',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  template: `
    <section id="skills" class="section">
      <div class="container">

        <!-- Header -->
        <div class="section-header reveal">
          <p class="section-label mono accent-text">03. Skills &amp; Expertise</p>
          <h2 class="section-title">Technical <span class="accent">Arsenal</span></h2>
          <p class="section-subtitle">
            Technologies and tools I've honed across 1/2+ years of production engineering.
          </p>
        </div>

        <!-- Category filter tabs -->
        <div class="filter-tabs reveal" style="transition-delay:0.1s">
          @for (cat of categories(); track cat) {
            <button
              class="filter-tab"
              [class.active]="activeCategory() === cat"
              (click)="activeCategory.set(cat)">
              {{ cat }}
              <span class="tab-count">{{ countFor(cat) }}</span>
            </button>
          }
        </div>

        <!-- Skills grid -->
        <div class="skills-grid" [@staggerIn]="activeCategory()">
          @for (skill of filteredSkills(); track skill.name) {
            <div class="skill-card glass-card reveal">
              <div class="skill-top">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-pct mono accent-text">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar-bg">
                <div
                  class="skill-bar-fill"
                  [style.width.%]="skill.level"
                  [style.--bar-width]="skill.level + '%'">
                </div>
              </div>
              <span class="skill-level-badge" [class]="getLevelClass(skill.level)">
                {{ getLevelLabel(skill.level) }}
              </span>
            </div>
          }
        </div>

        <!-- Tech logo cloud -->
        <div class="tech-cloud reveal" style="transition-delay:0.2s">
          <p class="cloud-label mono">// Also familiar with</p>
          <div class="cloud-tags">
            @for (tech of extraTechs; track tech) {
              <span class="tag">{{ tech }}</span>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .section-header { margin-bottom: 48px; }

    .section-label {
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
      display: block;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      margin-bottom: 16px;
      .accent { color: var(--accent-primary); }
    }

    /* Filter tabs */
    .filter-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 40px;
    }

    .filter-tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      border-radius: 100px;
      border: 1px solid var(--border-medium);
      background: transparent;
      color: var(--text-secondary);
      font-family: var(--font-body);
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 220ms ease;

      &:hover {
        border-color: var(--accent-border);
        color: var(--accent-primary);
        background: var(--accent-muted);
      }

      &.active {
        background: var(--accent-primary);
        border-color: var(--accent-primary);
        color: #000;
        font-weight: 700;
      }
    }

    .tab-count {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px; height: 20px;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      font-size: 0.72rem;
      font-family: var(--font-mono);

      .active & {
        background: rgba(0,0,0,0.2);
        color: #000;
      }
    }

    /* Skills grid */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 60px;

      @media (max-width: 480px) { grid-template-columns: 1fr; }
    }

    .skill-card {
      padding: 20px 22px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      cursor: default;
    }

    .skill-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .skill-name {
      font-weight: 600;
      font-size: 0.925rem;
      color: var(--text-primary);
    }

    .skill-pct {
      font-size: 0.8rem;
      font-weight: 700;
    }

    .skill-bar-bg {
      height: 6px;
      background: var(--bg-surface);
      border-radius: 3px;
      overflow: hidden;
    }

    .skill-bar-fill {
      height: 100%;
      border-radius: 3px;
      background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
      width: 0;
      animation: growBar 1s cubic-bezier(0.4,0,0.2,1) forwards;
      animation-delay: 0.3s;
      box-shadow: 0 0 8px var(--accent-glow);
    }

    @keyframes growBar {
      from { width: 0; }
      to   { width: var(--bar-width); }
    }

    .skill-level-badge {
      align-self: flex-start;
      font-size: 0.68rem;
      font-family: var(--font-mono);
      padding: 2px 8px;
      border-radius: 100px;
      border: 1px solid;

      &.expert  { color: #4ade80; border-color: rgba(74,222,128,0.3); background: rgba(74,222,128,0.08); }
      &.advanced{ color: var(--accent-primary); border-color: var(--accent-border); background: var(--accent-muted); }
      &.mid     { color: #facc15; border-color: rgba(250,204,21,0.3); background: rgba(250,204,21,0.08); }
    }

    /* Tech cloud */
    .tech-cloud {
      border-top: 1px solid var(--border-subtle);
      padding-top: 40px;
    }

    .cloud-label {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-bottom: 16px;
      letter-spacing: 0.05em;
    }

    .cloud-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
  `]
})
export class SkillsComponent implements OnInit {
  constructor(public data: PortfolioDataService) {}

  activeCategory = signal('All');

  categories = computed(() => {
    const cats = [...new Set(this.data.skills.map(s => s.category))];
    return ['All', ...cats];
  });

  filteredSkills = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All'
      ? this.data.skills
      : this.data.skills.filter(s => s.category === cat);
  });

  countFor(cat: string): number {
    return cat === 'All'
      ? this.data.skills.length
      : this.data.skills.filter(s => s.category === cat).length;
  }

  getLevelLabel(level: number): string {
    if (level >= 90) return 'Expert';
    if (level >= 78) return 'Advanced';
    return 'Mid-Level';
  }

  getLevelClass(level: number): string {
    if (level >= 90) return 'expert';
    if (level >= 78) return 'advanced';
    return 'mid';
  }

  extraTechs = [
    'Maven', 'Gradle', 'Swagger / OpenAPI', 'Liquibase', 'Flyway',
    'Prometheus', 'Grafana',
    'Git', 'Jira', 'Postman', 'IntelliJ IDEA',
    'OAuth2 / JWT', 'gRPC', 'GraphQL'
  ];

  ngOnInit(): void {}
}
