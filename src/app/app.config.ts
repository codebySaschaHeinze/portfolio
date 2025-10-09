import { ApplicationConfig, importProvidersFrom, APP_INITIALIZER, Injectable } from '@angular/core';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { LangService } from './services/lang-service';

@Injectable()
class JsonTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

function initLangFactory(lang: LangService) {
  return () => lang.init(); // liest localStorage.lang, sonst 'de'
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: JsonTranslateLoader },
      })
    ),
    { provide: APP_INITIALIZER, useFactory: initLangFactory, deps: [LangService], multi: true },
  ],
};
