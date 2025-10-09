import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

type Lang = 'de' | 'en';

@Injectable({ providedIn: 'root' })
export class LangService {
  private readonly storageKey = 'lang';
  private readonly isBrowser: boolean;

  constructor(private t: TranslateService, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.t.setDefaultLang('de');
  }

  init() {
    const saved = this.isBrowser ? (localStorage.getItem(this.storageKey) as Lang | null) : null;
    const lang: Lang = saved ?? 'de';
    this.set(lang);
  }

  set(lang: Lang) {
    this.t.use(lang).subscribe({
      next: () => {
        if (this.isBrowser) localStorage.setItem(this.storageKey, lang);
      },
      error: () => {
        this.t.use('de');
        if (this.isBrowser) localStorage.setItem(this.storageKey, 'de');
      },
    });
  }

  get(): Lang {
    return (this.t.currentLang as Lang) || 'de';
  }

  is(l: Lang) {
    return this.get() === l;
  }
}
