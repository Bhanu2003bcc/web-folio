import { Injectable, signal } from '@angular/core';

export type ThemeColor = 'cyan' | 'green' | 'purple' | 'orange' | 'red' | 'blue';

export interface ThemeOption {
  id: ThemeColor;
  label: string;
  primary: string;
  secondary: string;
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themes: ThemeOption[] = [
    { id: 'cyan',   label: 'Cyan',   primary: '#00BCD4', secondary: '#00E5FF' },
    { id: 'green',  label: 'Green',  primary: '#4CAF50', secondary: '#69F0AE' },
    { id: 'purple', label: 'Purple', primary: '#9C27B0', secondary: '#E040FB' },
    { id: 'orange', label: 'Orange', primary: '#FF9800', secondary: '#FFD740' },
    { id: 'red',    label: 'Red',    primary: '#F44336', secondary: '#FF5252' },
    { id: 'blue',   label: 'Blue',   primary: '#2196F3', secondary: '#448AFF' },
  ];

  currentTheme = signal<ThemeColor>(this.getSavedTheme());

  private getSavedTheme(): ThemeColor {
    try {
      return (localStorage.getItem('portfolio-theme') as ThemeColor) || 'cyan';
    } catch {
      return 'cyan';
    }
  }

  setTheme(theme: ThemeColor): void {
    this.currentTheme.set(theme);
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('portfolio-theme', theme); } catch {}
  }

  getThemeOption(id: ThemeColor): ThemeOption {
    return this.themes.find(t => t.id === id) ?? this.themes[0];
  }

  init(): void {
    const saved = this.getSavedTheme();
    document.documentElement.setAttribute('data-theme', saved);
  }
}
