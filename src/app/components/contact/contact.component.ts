import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms cubic-bezier(0.34,1.56,0.64,1)', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('successAnim', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('500ms cubic-bezier(0.34,1.56,0.64,1)', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
  template: `
    <section id="contact" class="section">
      <div class="container">

        <div class="contact-grid">

          <!-- Left info -->
          <div class="contact-info reveal">
            <p class="section-label mono accent-text">06. Contact</p>
            <h2 class="section-title">Let's <span class="accent">Connect</span></h2>
            <p class="contact-lead">
              Whether you have a project in mind, an exciting opportunity, or just want to talk
              about distributed systems — my inbox is always open.
            </p>

            <div class="contact-cards">
              @for (card of contactCards; track card.label) {
                <a [href]="card.href" [target]="card.external ? '_blank' : '_self'" class="contact-card glass-card">
                  <div class="contact-icon" [innerHTML]="card.icon"></div>
                  <div class="contact-card-text">
                    <span class="contact-card-label mono">{{ card.label }}</span>
                    <span class="contact-card-value">{{ card.value }}</span>
                  </div>
                  <svg class="contact-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M7 17L17 7M17 7H7M17 7v10"/>
                  </svg>
                </a>
              }
            </div>

            <!-- Availability badge -->
            <div class="availability-card">
              <span class="avail-dot"></span>
              <div>
                <p class="avail-title">Open to new opportunities</p>
                <p class="avail-sub mono">Full-time · Contract · Remote</p>
              </div>
            </div>
          </div>

          <!-- Right form -->
          <div class="contact-form-wrap reveal" style="transition-delay:0.15s">

            @if (!submitted()) {
              <div class="form-card glass-card" @fadeUp>
                <div class="form-header">
                  <h3 class="form-title">Send a Message</h3>
                  <p class="form-subtitle">I typically respond within 24 hours.</p>
                </div>

                <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" novalidate>

                  <div class="form-row">
                    <div class="form-field" [class.error]="isInvalid('name')">
                      <label for="name">Full Name <span class="required">*</span></label>
                      <div class="input-wrap">
                        <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        <input id="name" type="text" formControlName="name" placeholder="Arjun Sharma" autocomplete="name"/>
                      </div>
                      @if (isInvalid('name')) {
                        <span class="error-msg">Please enter your name</span>
                      }
                    </div>

                    <div class="form-field" [class.error]="isInvalid('email')">
                      <label for="email">Email Address <span class="required">*</span></label>
                      <div class="input-wrap">
                        <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        <input id="email" type="email" formControlName="email" placeholder="you@example.com" autocomplete="email"/>
                      </div>
                      @if (isInvalid('email')) {
                        <span class="error-msg">Please enter a valid email</span>
                      }
                    </div>
                  </div>

                  <div class="form-field" [class.error]="isInvalid('subject')">
                    <label for="subject">Subject <span class="required">*</span></label>
                    <div class="input-wrap">
                      <svg class="input-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
                      <input id="subject" type="text" formControlName="subject" placeholder="Project Collaboration / Job Opportunity"/>
                    </div>
                    @if (isInvalid('subject')) {
                      <span class="error-msg">Please enter a subject</span>
                    }
                  </div>

                  <div class="form-field" [class.error]="isInvalid('message')">
                    <label for="message">Message <span class="required">*</span></label>
                    <div class="textarea-wrap">
                      <textarea
                        id="message"
                        formControlName="message"
                        rows="5"
                        placeholder="Tell me about your project or opportunity..."></textarea>
                      <span class="char-count mono" [class.warn]="charCount() > 450">
                        {{ charCount() }} / 500
                      </span>
                    </div>
                    @if (isInvalid('message')) {
                      <span class="error-msg">Please enter a message (min 20 characters)</span>
                    }
                  </div>

                  <button
                    type="submit"
                    class="btn btn-primary submit-btn"
                    [class.loading]="sending()"
                    [disabled]="sending()">
                    @if (sending()) {
                      <span class="spinner"></span>
                      Sending...
                    } @else {
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9"/>
                      </svg>
                      Send Message
                    }
                  </button>

                </form>
              </div>
            } @else {
              <!-- Success state -->
              <div class="success-card glass-card" @successAnim>
                <div class="success-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22,4 12,14.01 9,11.01"/>
                  </svg>
                </div>
                <h3 class="success-title">Message Sent!</h3>
                <p class="success-msg">
                  Thank you for reaching out. I'll get back to you within 24 hours.
                </p>
                <button class="btn btn-outline" (click)="reset()" style="margin-top: 8px;">
                  Send Another
                </button>
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
      margin-bottom: 16px;
      .accent { color: var(--accent-primary); }
    }

    /* Layout */
    .contact-grid {
      display: grid;
      grid-template-columns: 420px 1fr;
      gap: 80px;
      align-items: start;

      @media (max-width: 1024px) { grid-template-columns: 1fr; gap: 48px; }
    }

    /* Info side */
    .contact-lead {
      color: var(--text-secondary);
      line-height: 1.8;
      font-size: 0.975rem;
      margin-bottom: 32px;
      max-width: 400px;
    }

    .contact-cards {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 28px;
    }

    .contact-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 20px;
      text-decoration: none;
      cursor: pointer;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, var(--accent-muted), transparent);
        opacity: 0;
        transition: opacity 250ms ease;
      }

      &:hover::before { opacity: 1; }

      &:hover .contact-arrow {
        transform: translate(3px,-3px);
        color: var(--accent-primary);
      }
    }

    .contact-icon {
      width: 40px; height: 40px;
      border-radius: var(--radius-sm);
      background: var(--accent-muted);
      border: 1px solid var(--accent-border);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--accent-primary);
      flex-shrink: 0;
    }

    .contact-card-text {
      display: flex;
      flex-direction: column;
      gap: 1px;
      flex: 1;
    }

    .contact-card-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 0.06em;
    }

    .contact-card-value {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--text-primary);
    }

    .contact-arrow {
      color: var(--text-muted);
      flex-shrink: 0;
      transition: transform 200ms ease, color 200ms ease;
    }

    /* Availability */
    .availability-card {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 16px 20px;
      background: rgba(74,222,128,0.05);
      border: 1px solid rgba(74,222,128,0.2);
      border-radius: var(--radius-md);
    }

    .avail-dot {
      width: 10px; height: 10px;
      border-radius: 50%;
      background: #4ade80;
      flex-shrink: 0;
      box-shadow: 0 0 10px #4ade80;
      animation: pulse 2s ease-in-out infinite;
    }

    .avail-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #4ade80;
    }

    .avail-sub {
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: 1px;
    }

    /* Form card */
    .form-card {
      padding: 32px;

      @media (max-width: 480px) { padding: 22px 18px; }
    }

    .form-header { margin-bottom: 28px; }

    .form-title {
      font-family: var(--font-display);
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
    }

    .form-subtitle {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    /* Form fields */
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;

      @media (max-width: 600px) { grid-template-columns: 1fr; }
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 18px;

      label {
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--text-secondary);
        letter-spacing: 0.02em;
      }

      .required { color: var(--accent-primary); }

      &.error {
        .input-wrap, .textarea-wrap textarea {
          border-color: #f87171 !important;
          box-shadow: 0 0 0 2px rgba(248,113,113,0.15) !important;
        }
      }
    }

    .input-wrap {
      position: relative;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      background: var(--bg-surface);
      transition: all 200ms ease;

      &:focus-within {
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 3px var(--accent-muted);
      }

      .input-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        pointer-events: none;
      }

      input {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        padding: 11px 14px 11px 38px;
        font-family: var(--font-body);
        font-size: 0.9rem;
        color: var(--text-primary);

        &::placeholder { color: var(--text-muted); }
      }
    }

    .textarea-wrap {
      position: relative;
      border: 1px solid var(--border-medium);
      border-radius: var(--radius-sm);
      background: var(--bg-surface);
      transition: all 200ms ease;

      &:focus-within {
        border-color: var(--accent-primary);
        box-shadow: 0 0 0 3px var(--accent-muted);
      }

      textarea {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        padding: 12px 14px 30px 14px;
        font-family: var(--font-body);
        font-size: 0.9rem;
        color: var(--text-primary);
        resize: vertical;
        min-height: 120px;

        &::placeholder { color: var(--text-muted); }
      }
    }

    .char-count {
      position: absolute;
      bottom: 8px;
      right: 10px;
      font-size: 0.7rem;
      color: var(--text-muted);

      &.warn { color: #f87171; }
    }

    .error-msg {
      font-size: 0.75rem;
      color: #f87171;
      font-family: var(--font-mono);
    }

    /* Submit button */
    .submit-btn {
      width: 100%;
      justify-content: center;
      padding: 14px;
      font-size: 1rem;
      margin-top: 4px;

      &.loading { opacity: 0.8; cursor: not-allowed; }
      &:disabled { pointer-events: none; }
    }

    .spinner {
      width: 16px; height: 16px;
      border: 2px solid rgba(0,0,0,0.2);
      border-top-color: #000;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    /* Success */
    .success-card {
      padding: 48px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
    }

    .success-icon {
      width: 80px; height: 80px;
      border-radius: 50%;
      background: rgba(74,222,128,0.1);
      border: 2px solid rgba(74,222,128,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #4ade80;
      animation: glow 3s ease-in-out infinite;
    }

    .success-title {
      font-family: var(--font-display);
      font-size: 1.6rem;
      font-weight: 800;
      color: var(--text-primary);
    }

    .success-msg {
      color: var(--text-secondary);
      font-size: 0.95rem;
      max-width: 320px;
      line-height: 1.7;
    }
  `]
})
export class ContactComponent {
  contactForm: FormGroup;
  sending = signal(false);
  submitted = signal(false);

  contactCards = [
    {
      label: 'EMAIL',
      value: 'bhanupratapsingh2939522@gmail.com',
      href: 'mailto:bhanupratapsingh2939522@gmail.com',
      external: false,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`
    },
    {
      label: 'LINKEDIN',
      value: 'linkedin.com/in/bpsingh7507/',
      href: 'https://www.linkedin.com/in/bpsingh7507/',
      external: true,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
    },
    {
      label: 'GITHUB',
      value: 'github.com/Bhanu2003bcc',
      href: 'https://github.com/Bhanu2003bcc',
      external: true,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`
    },
    {
      label: 'LOCATION',
      value: 'Bengaluru, India',
      href: 'https://maps.google.com/?q=Bengaluru,India',
      external: true,
      icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`
    },
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(4)]],
      message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(500)]],
    });
  }

  get charCount(): () => number {
    return () => (this.contactForm.get('message')?.value ?? '').length;
  }

  isInvalid(field: string): boolean {
    const ctrl = this.contactForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.sending.set(true);
    // Simulate API call
    setTimeout(() => {
      this.sending.set(false);
      this.submitted.set(true);
    }, 1800);
  }

  reset(): void {
    this.submitted.set(false);
    this.contactForm.reset();
  }
}
