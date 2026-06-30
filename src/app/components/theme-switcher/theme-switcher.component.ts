import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, ThemeColor } from '../../services/theme.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
  template: `
    <div class="switcher-wrapper">
      <button class="toggle-btn" (click)="toggle()" [title]="'Customize Theme'" aria-label="Toggle theme panel">
        <span class="toggle-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
          </svg>
        </span>
        <span class="current-dot" [style.background]="currentThemeColor"></span>
      </button>

      @if (isOpen()) {
        <div class="panel" @slideIn>
          <div class="panel-header">
            <h3>Theme</h3>
            <button class="close-btn" (click)="toggle()" aria-label="Close">✕</button>
          </div>
          <div class="theme-grid">
            @for (theme of themes; track theme.id) {
              <button
                class="theme-swatch"
                [class.active]="currentTheme() === theme.id"
                [title]="theme.label"
                (click)="applyTheme(theme.id)"
                [style.--swatch-color]="theme.primary"
                [style.--swatch-secondary]="theme.secondary"
              >
                <span class="swatch-ring">
                  <span class="swatch-dot"></span>
                </span>
                <span class="swatch-label">{{ theme.label }}</span>
              </button>
            }
          </div>
          <div class="panel-divider"></div>
          <p class="panel-hint">Click any color to instantly apply the theme.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .switcher-wrapper {
      position: fixed;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .toggle-btn {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      border: 1px solid var(--border-medium);
      background: var(--bg-card);
      color: var(--text-secondary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 300ms ease;
      backdrop-filter: blur(20px);

      &:hover {
        color: var(--accent-primary);
        border-color: var(--accent-border);
        background: var(--bg-card-hover);
        box-shadow: 0 0 20px var(--accent-glow);
        transform: rotate(30deg);
      }

      svg { pointer-events: none; }
    }

    .current-dot {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1.5px solid var(--bg-primary);
      transition: background 300ms ease;
    }

    .panel {
      background: var(--bg-card);
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-lg);
      padding: 20px;
      min-width: 200px;
      backdrop-filter: blur(30px);
      box-shadow: -8px 0 40px rgba(0,0,0,0.5);
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;

      h3 {
        font-family: var(--font-display);
        font-size: 0.95rem;
        font-weight: 700;
        color: var(--text-primary);
        letter-spacing: 0.05em;
      }
    }

    .close-btn {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid var(--border-subtle);
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 11px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 150ms ease;

      &:hover {
        background: var(--bg-surface);
        color: var(--text-primary);
      }
    }

    .theme-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }

    .theme-swatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 10px 6px;
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      transition: all 200ms ease;

      &:hover {
        background: var(--bg-surface);
        border-color: var(--border-subtle);
      }

      &.active {
        background: var(--bg-surface);
        border-color: var(--swatch-color, var(--accent-primary));

        .swatch-ring {
          border-color: var(--swatch-color, var(--accent-primary));
          box-shadow: 0 0 12px var(--swatch-color, var(--accent-primary));
        }
      }
    }

    .swatch-ring {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid var(--border-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 200ms ease;
    }

    .swatch-dot {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--swatch-color, var(--accent-primary));
    }

    .swatch-label {
      font-size: 0.7rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
      text-align: center;
    }

    .panel-divider {
      height: 1px;
      background: var(--border-subtle);
      margin: 14px 0;
    }

    .panel-hint {
      font-size: 0.72rem;
      color: var(--text-muted);
      line-height: 1.5;
      font-family: var(--font-mono);
    }

    @media (max-width: 480px) {
      .switcher-wrapper { right: 8px; top: auto; bottom: 80px; transform: none; flex-direction: column-reverse; align-items: flex-end; }
      .panel { min-width: 180px; padding: 16px; }
    }
  `]
})
export class ThemeSwitcherComponent {
  isOpen = signal(false);
  themes = this.themeService.themes;
  currentTheme = this.themeService.currentTheme;

  get currentThemeColor(): string {
    return this.themeService.getThemeOption(this.currentTheme()).primary;
  }

  constructor(private themeService: ThemeService) {}

  toggle(): void { this.isOpen.update(v => !v); }

  applyTheme(theme: ThemeColor): void {
    this.themeService.setTheme(theme);
  }
}
