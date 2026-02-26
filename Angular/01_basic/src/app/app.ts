import {Component} from '@angular/core';
import {HomePage} from './home/home';
import {RouterLink, RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
        </header>
      </a>
      <section class="content">
        <router-outlet />
      </section>
    </main>
  `,
})
export class App {
}
