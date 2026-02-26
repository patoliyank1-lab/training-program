import { ApplicationConfig } from '@angular/core';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideProtractorTestingSupport } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
    providers: [
      provideProtractorTestingSupport(),
       provideRouter(routes),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
    ]
};
