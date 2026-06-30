import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('expandPanel', [
      transition(':enter', [
        style({ height: 0, opacity: 0, overflow: 'hidden' }),
        animate('300ms cubic-bezier(0.4,0,0.2,1)', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4,0,0.2,1)', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
  template: `
    <section id="experience" class="section">
      <div class="container">

        <div class="exp-layout">
          <!-- Left header -->
          <div class="exp-header reveal">
            <p class="section-label mono accent-text">05. Experience</p>
            <h2 class="section-title">Where I've<br><span class="accent">Worked</span></h2>
            <p class="section-subtitle">My professional journey across top Indian IT firms and product companies.</p>

            <!-- Quick stats -->
            <div class="quick-stats">
              <div class="qs-item">
                <span class="qs-num gradient-text">7</span>
                <span class="qs-label">Months</span>
              </div>
              <div class="qs-sep"></div>
              <div class="qs-item">
                <span class="qs-num gradient-text">2</span>
                <span class="qs-label">Companies</span>
              </div>
              <div class="qs-sep"></div>
              <div class="qs-item">
                <span class="qs-num gradient-text">500k+</span>
                <span class="qs-label">Users Served</span>
              </div>
            </div>

            <!-- Education -->
            <div class="edu-card glass-card" style="margin-top: 32px; padding: 22px;">
              <p class="mono accent-text" style="font-size:0.78rem; letter-spacing:0.08em; margin-bottom:12px;">// EDUCATION</p>
              @for (edu of data.education; track edu.institution) {
                <div>
                  <p style="font-weight:700; font-size:0.925rem; color: var(--text-primary);">{{ edu.institution }}</p>
                  <p style="color: var(--text-secondary); font-size: 0.85rem; margin:4px 0;">{{ edu.degree }}</p>
                  <div style="display:flex; gap:16px; margin-top:8px; flex-wrap:wrap;">
                    <span class="tag">{{ edu.period }}</span>
                    @if (edu.grade) { <span class="tag">{{ edu.grade }}</span> }
                  </div>
                </div>
              }
            </div>
          </div>

          <!-- Right: Timeline -->
          <div class="timeline reveal" style="transition-delay:0.15s">
            @for (exp of data.experience; track exp.company; let i = $index) {
              <div class="timeline-item" [class.active]="activeExp() === i">

                <!-- Timeline dot & line -->
                <div class="timeline-track">
                  <div class="timeline-dot" [class.current]="exp.current">
                    @if (exp.current) {
                      <span class="dot-pulse"></span>
                    }
                  </div>
                  @if (i < data.experience.length - 1) {
                    <div class="timeline-line"></div>
                  }
                </div>

                <!-- Card -->
                <div class="exp-card glass-card" (click)="toggleExp(i)">
                  <div class="exp-card-header">
                    <div class="exp-info">
                      <div class="exp-role-row">
                        <h3 class="exp-role">{{ exp.role }}</h3>
                        @if (exp.current) {
                          <span class="current-badge">Current</span>
                        }
                      </div>
                      <div class="exp-meta">
                        <span class="exp-company accent-text">{{ exp.company }}</span>
                        <span class="meta-sep">·</span>
                        <span class="mono exp-period">{{ exp.period }}</span>
                        <span class="meta-sep hide-mobile">·</span>
                        <span class="exp-location hide-mobile">{{ exp.location }}</span>
                      </div>
                    </div>
                    <button class="expand-btn" [class.rotated]="activeExp() === i" aria-label="Expand">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                  </div>

                  @if (activeExp() === i) {
                    <div class="exp-body" @expandPanel>
                      <ul class="desc-list">
                        @for (point of exp.description; track point) {
                          <li class="desc-item">
                            <span class="desc-arrow accent-text">▸</span>
                            {{ point }}
                          </li>
                        }
                      </ul>
                      <div class="exp-tech-row">
                        @for (tech of exp.tech; track tech) {
                          <span class="tag">{{ tech }}</span>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .section-label { font-size: 0.85rem; letter-spacing: 0.1em; margin-bottom: 12px; display: block; }

    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 16px;
      .accent { color: var(--accent-primary); }
    }

    .exp-layout {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 80px;
      align-items: start;

      @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 48px; }
    }

    /* Quick stats */
    .quick-stats {
      display: flex;
      align-items: center;
      gap: 24px;
      margin-top: 32px;
      padding: 20px 24px;
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-md);
    }

    .qs-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }

    .qs-num {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 800;
    }

    .qs-label {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    .qs-sep {
      height: 32px; width: 1px;
      background: var(--border-subtle);
    }

    /* Timeline */
    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: 32px 1fr;
      gap: 20px;
      padding-bottom: 24px;

      &:last-child { padding-bottom: 0; }
    }

    .timeline-track {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 22px;
    }

    .timeline-dot {
      width: 14px; height: 14px;
      border-radius: 50%;
      border: 2px solid var(--border-medium);
      background: var(--bg-primary);
      flex-shrink: 0;
      position: relative;
      transition: all 200ms ease;

      &.current {
        border-color: var(--accent-primary);
        background: var(--accent-primary);
      }

      .timeline-item.active & {
        border-color: var(--accent-primary);
        box-shadow: 0 0 12px var(--accent-glow);
      }
    }

    .dot-pulse {
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 1px solid var(--accent-primary);
      animation: pulseDot 2s ease-in-out infinite;
    }

    @keyframes pulseDot {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.6); opacity: 0; }
    }

    .timeline-line {
      flex: 1;
      width: 1px;
      background: linear-gradient(to bottom, var(--accent-border), var(--border-subtle));
      margin-top: 8px;
      min-height: 24px;
    }

    /* Exp card */
    .exp-card {
      cursor: pointer;
      padding: 22px 24px;
      transition: all 250ms ease;

      &:hover { border-color: var(--accent-border); }
    }

    .exp-card-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 12px;
    }

    .exp-info { flex: 1; }

    .exp-role-row {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 6px;
    }

    .exp-role {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .current-badge {
      font-size: 0.68rem;
      font-family: var(--font-mono);
      padding: 2px 8px;
      border-radius: 100px;
      background: rgba(74,222,128,0.1);
      border: 1px solid rgba(74,222,128,0.3);
      color: #4ade80;
    }

    .exp-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 0.85rem;
    }

    .exp-company { font-weight: 600; }
    .meta-sep { color: var(--text-muted); }
    .exp-period { font-size: 0.8rem; color: var(--text-muted); }
    .exp-location { color: var(--text-muted); font-size: 0.82rem; }

    .expand-btn {
      width: 32px; height: 32px;
      border-radius: 50%;
      border: 1px solid var(--border-subtle);
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: all 200ms ease;

      svg { transition: transform 250ms ease; }
      &.rotated svg { transform: rotate(180deg); }
      &:hover { border-color: var(--accent-border); color: var(--accent-primary); }
    }

    /* Body */
    .exp-body {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--border-subtle);
      overflow: hidden;
    }

    .desc-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 18px;
    }

    .desc-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.875rem;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .desc-arrow {
      flex-shrink: 0;
      margin-top: 3px;
      font-size: 0.7rem;
    }

    .exp-tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `]
})
export class ExperienceComponent {
  constructor(public data: PortfolioDataService) {}

  activeExp = signal(0); // first one open by default

  toggleExp(i: number): void {
    this.activeExp.set(this.activeExp() === i ? -1 : i);
  }
}
