import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="section">
      <div class="container">
        <div class="about-grid">
          <!-- Left: Text -->
          <div class="about-text reveal">
            <p class="section-label mono accent-text">02. About Me</p>
            <h2 class="section-title">Passionate about<br><span class="accent">scalable systems</span></h2>
            <p class="section-subtitle">{{ data.profile.bio }}</p>

            <p class="about-body">
              I thrive in the intersection of clean architecture, domain-driven design, and high-throughput
              distributed systems. Whether it's optimizing a slow database query, designing a fault-tolerant
              microservice mesh, or mentoring a junior developer — I bring the same level of care and craft.
            </p>

            <p class="about-body">
              When I'm not writing Java, I'm exploring open-source contributions, writing technical blog posts,
              or participating in competitive programming challenges.
            </p>

            <!-- Info grid -->
            <div class="info-grid">
              @for (item of infoItems; track item.label) {
                <div class="info-item">
                  <span class="info-label mono">{{ item.label }}</span>
                  <span class="info-value">{{ item.value }}</span>
                </div>
              }
            </div>

            <div class="btn-row" style="margin-top: 32px;">
              <a [href]="data.profile.resume" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Download Resume</a>
              <a href="#contact" class="btn btn-ghost">Let's Talk</a>
            </div>
          </div>

          <!-- Right: Stats + certifications -->
          <div class="about-right reveal" style="transition-delay: 0.2s;">
            <!-- Stats cards -->
            <div class="stats-grid">
              @for (stat of stats; track stat.label) {
                <div class="stat-card glass-card">
                  <div class="stat-icon">{{ stat.icon }}</div>
                  <div class="stat-num gradient-text">{{ stat.value }}</div>
                  <div class="stat-label">{{ stat.label }}</div>
                  <div class="stat-sub">{{ stat.sub }}</div>
                </div>
              }
            </div>

            <!-- Certifications -->
            <div class="certs-card glass-card" style="margin-top: 20px; padding: 24px;">
              <h3 class="cert-title mono accent-text" style="margin-bottom: 16px; font-size: 0.85rem; letter-spacing: 0.05em;">// CERTIFICATIONS</h3>
              @for (cert of data.certifications; track cert.name) {
                <div class="cert-item">
                  <div class="cert-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
                  </div>
                  <div>
                    <p class="cert-name">{{ cert.name }}</p>
                    <p class="cert-meta">{{ cert.issuer }} · {{ cert.year }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: start;

      @media (max-width: 900px) { grid-template-columns: 1fr; gap: 50px; }
    }

    .section-label {
      font-size: 0.85rem;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
      display: block;
    }

    .section-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 20px;
      .accent { color: var(--accent-primary); }
    }

    .about-body {
      color: var(--text-secondary);
      line-height: 1.85;
      margin-bottom: 16px;
      font-size: 0.975rem;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 24px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .info-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .info-value {
      font-size: 0.9rem;
      color: var(--text-primary);
      font-weight: 500;
    }

    .btn-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    /* Stats */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .stat-card {
      padding: 24px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .stat-icon { font-size: 1.5rem; margin-bottom: 4px; }

    .stat-num {
      font-family: var(--font-display);
      font-size: 2rem;
      font-weight: 800;
    }

    .stat-label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary);
    }

    .stat-sub {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    /* Certs */
    .cert-title { font-weight: 600; }

    .cert-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid var(--border-subtle);

      &:last-child { border-bottom: none; padding-bottom: 0; }
    }

    .cert-icon {
      width: 32px; height: 32px;
      border-radius: var(--radius-sm);
      background: var(--accent-muted);
      border: 1px solid var(--accent-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-primary);
      flex-shrink: 0;
    }

    .cert-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
      line-height: 1.4;
    }

    .cert-meta {
      font-size: 0.75rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
      margin-top: 2px;
    }
  `]
})
export class AboutComponent {
  constructor(public data: PortfolioDataService) {}

  infoItems = [
    { label: 'Location', value: this.data.profile.location },
    { label: 'Email', value: this.data.profile.email },
    { label: 'Experience', value: `${this.data.profile.yearsExp}+ Years` },
    { label: 'Availability', value: 'Open to Offers' },
  ];

  stats = [
    { icon: '', value: '1/2+', label: 'Years Experience', sub: 'Java Backend' },
    { icon: '', value: '7+', label: 'Projects Shipped', sub: 'Production-ready' },
    { icon: '', value: '2', label: 'Companies', sub: 'Texium Solutions · Forage' },
    { icon: '', value: '1', label: 'Certifications', sub: 'Software Developer' },
  ];
}
