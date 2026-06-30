import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('mobileMenu', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-16px)' }),
        animate('250ms cubic-bezier(0.34,1.56,0.64,1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('180ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()" [class.hidden]="hidden()">
      <div class="container nav-inner">
        <!-- Logo -->
        <a class="logo" href="#home">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">BPS</span>
          <span class="logo-bracket">/&gt;</span>
        </a>

        <!-- Desktop Links -->
        <ul class="nav-links hide-mobile">
          @for (item of navItems; track item.label) {
            <li>
              <a [href]="item.href" class="nav-link" (click)="setActive(item.label)" [class.active]="activeSection() === item.label">
                <span class="nav-num">{{ item.num }}</span>
                {{ item.label }}
              </a>
            </li>
          }
        </ul>

        <!-- CTA + Hamburger -->
        <div class="nav-actions">
          <a href="#contact" class="btn btn-outline hide-mobile" style="padding: 8px 20px; font-size: 0.875rem;">
            Hire Me
          </a>
          <button class="hamburger hide-desktop" (click)="toggleMenu()" [class.open]="menuOpen()" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      @if (menuOpen()) {
        <div class="mobile-menu" @mobileMenu>
          @for (item of navItems; track item.label) {
            <a [href]="item.href" class="mobile-link" (click)="menuOpen.set(false)">
              <span class="nav-num">{{ item.num }}</span>{{ item.label }}
            </a>
          }
          <a href="#contact" class="btn btn-primary" style="margin-top: 8px; width: 100%; justify-content: center;" (click)="menuOpen.set(false)">
            Hire Me
          </a>
        </div>
      }
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 900;
      padding: 18px 0;
      transition: all 300ms ease;
      background: transparent;

      &.scrolled {
        padding: 12px 0;
        background: rgba(8,8,8,0.85);
        backdrop-filter: blur(20px);
        border-bottom: 1px solid var(--border-subtle);
      }

      &.hidden { transform: translateY(-100%); }
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-family: var(--font-mono);
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 2px;
      transition: all 200ms ease;

      .logo-bracket { color: var(--accent-primary); }
      .logo-text { color: var(--text-primary); padding: 0 2px; }

      &:hover .logo-text { color: var(--accent-primary); }
    }

    .nav-links {
      list-style: none;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 8px 14px;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      transition: all 200ms ease;
      position: relative;

      &:hover, &.active {
        color: var(--accent-primary);
        background: var(--accent-muted);
      }

      &.active::after {
        content: '';
        position: absolute;
        bottom: 0; left: 50%;
        transform: translateX(-50%);
        width: 4px; height: 4px;
        background: var(--accent-primary);
        border-radius: 50%;
      }
    }

    .nav-num {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--accent-primary);
      opacity: 0.7;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .hamburger {
      width: 40px; height: 40px;
      background: transparent;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 5px;
      padding: 10px;
      transition: all 200ms ease;

      span {
        display: block;
        width: 20px; height: 1.5px;
        background: var(--text-secondary);
        border-radius: 2px;
        transition: all 250ms ease;
        transform-origin: center;
      }

      &:hover { border-color: var(--accent-border); span { background: var(--accent-primary); } }

      &.open {
        border-color: var(--accent-border);
        span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); background: var(--accent-primary); }
        span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); background: var(--accent-primary); }
      }
    }

    .mobile-menu {
      padding: 16px 24px 24px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: rgba(8,8,8,0.97);
      backdrop-filter: blur(20px);
      border-top: 1px solid var(--border-subtle);
    }

    .mobile-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 14px 16px;
      border-radius: var(--radius-sm);
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 1rem;
      font-weight: 500;
      transition: all 200ms ease;

      &:hover { color: var(--accent-primary); background: var(--accent-muted); }
    }
  `]
})
export class NavbarComponent implements OnInit {
  scrolled = signal(false);
  hidden = signal(false);
  menuOpen = signal(false);
  activeSection = signal('Home');
  private lastScroll = 0;

  navItems = [
    { num: '', label: 'Home', href: '#home' },
    { num: '', label: 'About', href: '#about' },
    { num: '', label: 'Skills', href: '#skills' },
    { num: '', label: 'Projects', href: '#projects' },
    { num: '', label: 'Experience', href: '#experience' },
    { num: '', label: 'Contact', href: '#contact' },
  ];

  ngOnInit(): void {
    this.observeSections();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const current = window.scrollY;
    this.scrolled.set(current > 50);
    this.hidden.set(current > this.lastScroll + 5 && current > 200);
    this.lastScroll = current;
  }

  setActive(label: string): void { this.activeSection.set(label); }
  toggleMenu(): void { this.menuOpen.update(v => !v); }

  private observeSections(): void {
    const sectionMap: Record<string, string> = {
      home: 'Home', about: 'About', skills: 'Skills',
      projects: 'Projects', experience: 'Experience', contact: 'Contact'
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.activeSection.set(sectionMap[e.target.id] ?? '');
        }
      });
    }, { threshold: 0.4 });
    setTimeout(() => {
      Object.keys(sectionMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 500);
  }
}
