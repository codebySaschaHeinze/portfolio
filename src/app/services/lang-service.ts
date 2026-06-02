import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'de' | 'en';

/**
 * Service responsible for managing the current application language.
 * It integrates ngx-translate, persists the selected language
 * in localStorage (on the browser), and exposes helper methods
 * for reading and comparing the active language.
 */
@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly storageKey = 'lang';
  private readonly isBrowser: boolean;
  private current: Lang = 'de';

  /**
   * Initializes the translate service and sets up supported languages.
   * @param t TranslateService used to load and switch translations.
   * @param platformId Angular platform identifier used to detect browser environment.
   */
  constructor(private readonly t: TranslateService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.t.addLangs(['de', 'en']);
    this.t.setDefaultLang('de');
    this.current = 'de';
  }

  /**
   * Initializes the language from persisted state or falls back to the default.
   * Intended to be called once during application startup (APP_INITIALIZER).
   */
  init(): void {
    const saved = this.isBrowser ? (localStorage.getItem(this.storageKey) as Lang | null) : null;
    const lang: Lang = saved ?? 'de';
    this.set(lang);
  }

  /**
   * Sets the active language, updates the translate service,
   * and persists the choice in localStorage when running in a browser.
   * @param lang Language code to be activated.
   */
  set(lang: Lang): void {
    this.current = lang;
    this.t.use(lang).subscribe({
      next: () => {
        if (this.isBrowser) {
          localStorage.setItem(this.storageKey, lang);
        }
      },
      error: () => {
        this.current = 'de';
        this.t.use('de').subscribe();
        if (this.isBrowser) {
          localStorage.setItem(this.storageKey, 'de');
        }
      },
    });
  }

  get(): Lang {
    return this.current;
  }

  is(l: Lang): boolean {
    return this.current === l;
  }
}
