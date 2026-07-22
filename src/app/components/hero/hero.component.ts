import { Component, OnInit, OnDestroy, signal, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="home" class="hero-section section">
      <!-- Animated particles canvas -->
      <canvas #particleCanvas class="particles"></canvas>

      <!-- Glow orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>

      <div class="container hero-content">
        <div class="hero-left">
          <!-- Status badge -->
          <div class="status-badge animate-fadeInUp delay-1">
            <span class="status-dot"></span>
            <span class="mono" style="font-size:0.78rem;">Available for opportunities</span>
          </div>

          <!-- Greeting -->
          <p class="greeting animate-fadeInUp delay-2">
            <span class="mono accent-text">&#47;&#47; Hello, World! I'm</span>
          </p>

          <!-- Name -->
          <h1 class="hero-name animate-fadeInUp delay-2">
            {{ data.profile.name }}
          </h1>

          <!-- Typed title -->
          <h2 class="hero-title animate-fadeInUp delay-3">
            <span class="typed-prefix">I build </span>
            <span class="typed-text accent-text">{{ typedText() }}</span>
            <span class="cursor" [class.blink]="!isDeleting()">|</span>
          </h2>

          <!-- Subtitle chips -->
          <div class="chip-row animate-fadeInUp delay-4">
            @for (tech of heroTechs; track tech) {
              <span class="tag">{{ tech }}</span>
            }
          </div>

          <!-- Bio -->
          <p class="hero-bio animate-fadeInUp delay-5">{{ data.profile.bio }}</p>

          <!-- CTAs -->
          <div class="cta-row animate-fadeInUp delay-6">
            <a href="#projects" class="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>
              View Projects
            </a>
            <a href="#contact" class="btn btn-outline">
              Get In Touch
            </a>
            <a [href]="data.profile.resume" class="btn btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
              Resume
            </a>
          </div>

          <!-- Social Links -->
          <div class="social-row animate-fadeInUp delay-7">
            <a [href]="data.profile.github" target="_blank" class="social-link" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a [href]="data.profile.linkedin" target="_blank" class="social-link" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a [href]="'mailto:' + data.profile.email" class="social-link" aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </a>
          </div>
        </div>

        <!-- Right side: Code card -->
        <div class="hero-right animate-fadeInRight delay-3">
          <div class="code-card animate-float">
            <div class="code-card-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
              <span class="code-filename mono">Developer.java</span>
            </div>
            <div class="code-body">
              <pre class="code-content"><code><span class="kw">public class</span> <span class="cls">Developer</span> &#123;

  <span class="kw">private final</span> <span class="cls">String</span> name  = <span class="str">"Bhanu Pratap Singh"</span>;
  <span class="kw">private final</span> <span class="cls">String</span> role  = <span class="str">"Software Developer"</span>;
  <span class="kw">private final int</span>    exp   = <span class="num">1</span>;

  <span class="kw">private final</span> <span class="cls">List</span>&lt;<span class="cls">String</span>&gt; stack = <span class="cls">List</span>.of(
    <span class="str">"Spring Boot"</span>,
    <span class="str">"Microservices"</span>,
    <span class="str">"Apache Kafka"</span>,
    <span class="str">"Cloud"</span>
  );

  <span class="kw">public</span> <span class="cls">String</span> <span class="fn">getPassion</span>() &#123;
    <span class="kw">return</span> <span class="str">"Building scalable"</span>
         + <span class="str">" systems "</span>;
  &#125;
&#125;</code></pre>
            </div>
            <!-- Stats row -->
            <div class="stat-row">
              <div class="stat-item">
                <span class="stat-num gradient-text">{{ data.profile.yearsExp }}+</span>
                <span class="stat-label">Years Exp</span>
              </div>
              <div class="stat-sep"></div>
              <div class="stat-item">
                <span class="stat-num gradient-text">{{ data.profile.projects }}+</span>
                <span class="stat-label">Projects</span>
              </div>
              <div class="stat-sep"></div>
              <div class="stat-item">
                <span class="stat-num gradient-text">{{ data.profile.companies }}</span>
                <span class="stat-label">Companies</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-hint animate-fadeInUp delay-7">
        <span class="mono" style="font-size:0.75rem; color: var(--text-muted);">scroll down</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 80px;
    }

    .particles {
      position: absolute;
      inset: 0;
      pointer-events: none;
      opacity: 0.5;
    }

    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
      animation: float 8s ease-in-out infinite;

      &-1 {
        width: 500px; height: 500px;
        background: radial-gradient(circle, var(--accent-glow), transparent 70%);
        top: -100px; left: -100px;
        animation-delay: 0s;
      }
      &-2 {
        width: 400px; height: 400px;
        background: radial-gradient(circle, rgba(255,255,255,0.02), transparent 70%);
        bottom: -100px; right: -100px;
        animation-delay: 3s;
      }
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
      position: relative;
      z-index: 2;

      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        gap: 50px;
        text-align: center;
      }
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: var(--accent-muted);
      border: 1px solid var(--accent-border);
      border-radius: 100px;
      margin-bottom: 20px;
    }

    .status-dot {
      width: 8px; height: 8px;
      background: #4ade80;
      border-radius: 50%;
      animation: pulse 2s ease-in-out infinite;
      box-shadow: 0 0 8px #4ade80;
    }

    .greeting {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-bottom: 8px;
    }

    .hero-name {
      font-family: var(--font-display);
      font-size: clamp(2.8rem, 6vw, 5rem);
      font-weight: 800;
      line-height: 1.05;
      letter-spacing: -0.02em;
      margin-bottom: 16px;
      color: var(--text-primary);
    }

    .hero-title {
      font-family: var(--font-body);
      font-size: clamp(1.2rem, 2.5vw, 1.6rem);
      font-weight: 400;
      color: var(--text-secondary);
      margin-bottom: 24px;
      min-height: 2.4em;
    }

    .typed-prefix { color: var(--text-secondary); }

    .cursor {
      color: var(--accent-primary);
      font-weight: 300;

      &.blink { animation: cursor-blink 0.8s step-end infinite; }
    }

    .chip-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 24px;

      @media (max-width: 900px) { justify-content: center; }
    }

    .hero-bio {
      color: var(--text-secondary);
      line-height: 1.8;
      max-width: 520px;
      margin-bottom: 32px;
      font-size: 0.975rem;

      @media (max-width: 900px) { margin: 0 auto 32px; }
    }

    .cta-row {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 32px;

      @media (max-width: 900px) { justify-content: center; }
    }

    .social-row {
      display: flex;
      gap: 12px;

      @media (max-width: 900px) { justify-content: center; }
    }

    .social-link {
      width: 42px; height: 42px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-medium);
      background: var(--bg-card);
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 250ms ease;

      &:hover {
        color: var(--accent-primary);
        border-color: var(--accent-border);
        background: var(--accent-muted);
        transform: translateY(-3px);
      }
    }

    /* ---- Code Card ---- */
    .hero-right {
      @media (max-width: 900px) { order: -1; }
    }

    .code-card {
      background: var(--bg-card);
      border: 1px solid var(--border-subtle);
      border-radius: var(--radius-lg);
      overflow: hidden;
      box-shadow: var(--shadow-card), 0 0 60px var(--accent-glow);
      transition: box-shadow 300ms ease;

      &:hover { box-shadow: var(--shadow-card), 0 0 80px var(--accent-glow); }
    }

    .code-card-header {
      background: var(--bg-surface);
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--border-subtle);
    }

    .dot {
      width: 12px; height: 12px;
      border-radius: 50%;
      &.red    { background: #ff5f57; }
      &.yellow { background: #febc2e; }
      &.green  { background: #28c840; }
    }

    .code-filename {
      margin-left: 8px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .code-body { padding: 20px; }

    .code-content {
      font-family: var(--font-mono);
      font-size: 0.82rem;
      line-height: 1.8;
      color: var(--text-secondary);
      overflow-x: auto;
      white-space: pre;

      .kw  { color: #c792ea; }
      .cls { color: #82aaff; }
      .str { color: #c3e88d; }
      .fn  { color: #82b1ff; }
      .num { color: #f78c6c; }
    }

    .stat-row {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 16px 20px;
      border-top: 1px solid var(--border-subtle);
      background: var(--bg-surface);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }

    .stat-num {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 800;
    }

    .stat-label {
      font-size: 0.72rem;
      font-family: var(--font-mono);
      color: var(--text-muted);
    }

    .stat-sep {
      width: 1px;
      height: 32px;
      background: var(--border-subtle);
    }

    /* ---- Scroll hint ---- */
    .scroll-hint {
      position: absolute;
      bottom: 32px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      z-index: 2;
    }

    .scroll-arrow {
      width: 20px; height: 20px;
      border-right: 2px solid var(--accent-primary);
      border-bottom: 2px solid var(--accent-primary);
      transform: rotate(45deg);
      animation: bounce 1.5s ease-in-out infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: rotate(45deg) translateY(0); opacity: 1; }
      50% { transform: rotate(45deg) translateY(6px); opacity: 0.5; }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  typedText = signal('');
  isDeleting = signal(false);

  private phrases = [
    'scalable APIs',
    'microservices',
    'cloud systems',
    'backend magic',
    'Spring Boot apps',
    'building Agent workflows',
  ];
  private phraseIndex = 0;
  private charIndex = 0;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private animFrame: number | null = null;

  heroTechs = ['Java 21', 'Spring Boot', 'Apache Kafka', 'AWS', 'Kubernetes', 'PostgreSQL', 'Python', 'Agentic AI', 'Generative AI', 'FastAPI'];

  constructor(public data: PortfolioDataService) {}

  ngOnInit(): void {
    this.runTyping();
    setTimeout(() => this.initParticles(), 100);
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }

  private runTyping(): void {
    const phrase = this.phrases[this.phraseIndex];
    const del = this.isDeleting();

    if (!del) {
      this.charIndex++;
      this.typedText.set(phrase.slice(0, this.charIndex));
      if (this.charIndex === phrase.length) {
        this.isDeleting.set(true);
        this.timer = setTimeout(() => this.runTyping(), 1800);
        return;
      }
    } else {
      this.charIndex--;
      this.typedText.set(phrase.slice(0, this.charIndex));
      if (this.charIndex === 0) {
        this.isDeleting.set(false);
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        this.timer = setTimeout(() => this.runTyping(), 400);
        return;
      }
    }
    this.timer = setTimeout(() => this.runTyping(), del ? 60 : 100);
  }

  private initParticles(): void {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    const count = Math.min(60, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent-primary').trim() || '#00BCD4';

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      this.animFrame = requestAnimationFrame(animate);
    };
    animate();
  }
}
