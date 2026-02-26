import {RouterModule, Routes} from '@angular/router';
import {HomePage} from './home/home';
import {PipeComponent} from './pipe/pipe';
import { NgModule } from '@angular/core';
import { RouteCurrencyPipe } from './pipe/CurrencyPipe/CurrencyPipe';
import { TestPage } from './test/test';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pipe',
    component: PipeComponent,
  },
    {
    path: 'pipe/:CurrencyPipe',
    component: RouteCurrencyPipe,
  },
      {
    path: 'test',
    component: TestPage,
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
