import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly storageKey = 'lang';
  private readonly isBrowser: boolean;

  private current: Lang = 'de';

  constructor(private readonly t: TranslateService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.t.addLangs(['de', 'en']);
    this.t.setDefaultLang('de');
    this.current = 'de';
  }

  init(): void {
    const saved = this.isBrowser ? (localStorage.getItem(this.storageKey) as Lang | null) : null;
    const lang: Lang = saved ?? 'de';
    this.set(lang);
  }

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
