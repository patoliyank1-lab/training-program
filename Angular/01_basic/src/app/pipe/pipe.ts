// src/app/app.component.ts

import { AsyncPipe, CommonModule, CurrencyPipe, DecimalPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, LowerCasePipe, PercentPipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Observable, Observer } from 'rxjs';


@Component({
  selector: 'async-observable-pipe',
  imports: [AsyncPipe, CommonModule],
  template: `<div><code>observable|async</code>: Time: {{ (time | async) | date: 'mediumDate' }}</div>`,
})
export class AsyncObservablePipeComponent {
  time = new Observable<string>((observer: Observer<string>) => {
    setInterval(() => observer.next(new Date().toString()), 3000);
  });
}


@Component({
  selector: 'currency-pipe',
  imports: [CurrencyPipe],
  template: `<div>
    <!--output '$0.26'-->
    <p>A: {{ a | currency }}</p>
    <!--output 'CA$0.26'-->
    <p>A: {{ a | currency: 'CAD' }}</p>
    <!--output 'CAD0.26'-->
    <p>A: {{ a | currency: 'CAD' : 'code' }}</p>
    <!--output 'CA$0,001.35'-->
    <p>B: {{ b | currency: 'CAD' : 'symbol' : '4.2-2' }}</p>
    <!--output '$0,001.35'-->
    <p>B: {{ b | currency: 'CAD' : 'symbol-narrow' : '4.2-2' }}</p>
    <!--output 'CLP1' because CLP has no cents-->
    <p>B: {{ b | currency: 'CLP' }}</p>
  </div>`,
})
export class CurrencyPipeComponent {
  a: number = 0.259;
  b: number = 1.3495;
}


@Component({
  selector: 'number-pipe',
  imports: [DecimalPipe],
  template: `<div>
    <p>
      No specified formatting:
      {{ pi | number }}
      <!--output: '3.142'-->
    </p>
    <p>
      With digitsInfo parameter specified:
      {{ pi | number: '4.1-5' }}
      <!--output: '0,003.14159'-->
    </p>
  </div>`,
})
export class NumberPipeComponent {
  pi: number = 3.14159265359;
}


@Component({
  selector: 'i18n-select-pipe',
  imports: [I18nSelectPipe],
  template: `<div>{{ gender | i18nSelect: inviteMap }}</div>`,
})
export class I18nSelectPipeComponent {
  gender: string = 'male';
  inviteMap: any = {'male': 'Invite him.', 'female': 'Invite her.', 'other': 'Invite them.'};
}


@Component({
  selector: 'json-pipe',
  imports: [JsonPipe],
  template: `<div>
    <p>Without JSON pipe:</p>
    <pre>{{ object }}</pre>
    <p>With JSON pipe:</p>
    <pre>{{ object | json }}</pre>
  </div>`,
})
export class JsonPipeComponent {
  object: Object = {foo: 'bar', baz: 'qux'};
}


@Component({
  selector: 'i18n-plural-pipe',
  imports: [I18nPluralPipe],
  template: `<div>{{ messages.length | i18nPlural: messageMapping }}</div>`,
})
export class I18nPluralPipeComponent {
  messages: any[] = ['Message 1','Message 1', 'Message 1','Message 1'];
  messageMapping: {[k: string]: string} = {
    '=0': 'No messages.',
    '=1': 'One message.',
    'other': '# messages.',
  };
}


@Component({
  selector: 'keyvalue-pipe',
  imports: [KeyValuePipe],
  template: ` <span>
    <p>Object</p>
    @for (item of object | keyvalue; track item.key) {
      <div>{{ item.key }}:{{ item.value }}</div>
    }
    <p>Map</p>
    @for (item of map | keyvalue; track item.key) {
      <div>{{ item.key }}:{{ item.value }}</div>
    }
    <p>Natural order</p>
    @for (item of map | keyvalue: null; track item.key) {
      <div>{{ item.key }}:{{ item.value }}</div>
    }
  </span>`,
})
export class KeyValuePipeComponent {
  object: {[key: number]: string} = {2: 'foo', 1: 'bar'};
  map = new Map([
    [2, 'foo'],
    [1, 'bar'],
  ]);
}

@Component({
  selector: 'lowerupper-pipe',
  imports: [LowerCasePipe, UpperCasePipe],
  template: `<div>
    <label>Name: </label><input #name (keyup)="change(name.value)" type="text" />
    <p>In lowercase:</p>
    <pre>'{{ value | lowercase }}'</pre>
    <p>In uppercase:</p>
    <pre>'{{ value | uppercase }}'</pre>
  </div>`,
})
export class LowerUpperPipeComponent {
  value: string = '';
  change(value: string) {
    this.value = value;
  }
}


@Component({
  selector: 'percent-pipe',
  imports: [PercentPipe],
  template: `<div>
    <!--output '26%'-->
    <p>A: {{ a | percent }}</p>
    <!--output '0,134.950%'-->
    <p>B: {{ b | percent: '4.3-5' }}</p>
  </div>`,
})
export class PercentPipeComponent {
  a: number = 0.259;
  b: number = 1.3495;
}


@Component({
  selector: 'slice-string-pipe',
  imports: [SlicePipe],
  template: `<div>
    <p>{{ str }}[0:4]: '{{ str | slice: 0 : 4 }}' - output is expected to be 'abcd'</p>
    <p>{{ str }}[4:0]: '{{ str | slice: 4 : 0 }}' - output is expected to be ''</p>
    <p>{{ str }}[-4]: '{{ str | slice: -4 }}' - output is expected to be 'ghij'</p>
    <p>{{ str }}[-4:-2]: '{{ str | slice: -4 : -2 }}' - output is expected to be 'gh'</p>
    <p>{{ str }}[-100]: '{{ str | slice: -100 }}' - output is expected to be 'abcdefghij'</p>
    <p>{{ str }}[100]: '{{ str | slice: 100 }}' - output is expected to be ''</p>
  </div>`,
})
export class SlicePipeStringComponent {
  str: string = 'abcdefghij';
}

@Component({
  selector: 'titlecase-pipe',
  imports: [TitleCasePipe],
  template: `<div>
    <p>{{ 'some string' | titlecase }}</p>
    <!-- output is expected to be "Some String" -->
    <p>{{ 'tHIs is mIXeD CaSe' | titlecase }}</p>
    <!-- output is expected to be "This Is Mixed Case" -->
    <p>{{ "it's non-trivial question" | titlecase }}</p>
    <!-- output is expected to be "It's Non-trivial Question" -->
    <p>{{ 'one,two,three' | titlecase }}</p>
    <!-- output is expected to be "One,two,three" -->
    <p>{{ 'true|false' | titlecase }}</p>
    <!-- output is expected to be "True|false" -->
    <p>{{ 'foo-vs-bar' | titlecase }}</p>
    <!-- output is expected to be "Foo-vs-bar" -->
  </div>`,
})
export class TitleCasePipeComponent {}

@Component({
    selector: 'pipe-app',
    imports: [
      CommonModule,
      FormsModule,
      CurrencyPipeComponent,
      AsyncObservablePipeComponent,
      I18nSelectPipeComponent,
      I18nPluralPipeComponent,
      NumberPipeComponent,
      JsonPipeComponent,
      KeyValuePipeComponent,
      LowerUpperPipeComponent,
      PercentPipeComponent,
      SlicePipeStringComponent,
      TitleCasePipeComponent,
    ],
    standalone: true,
    templateUrl: './pipe.html',
})
export class PipeComponent {
    title = "my-angular-form-project";

    countryList: country[] = [
        new country('1', 'India'),
        new country('2', 'USA'),
        new country('3', 'England'),
    ];

    onSubmit(contactForm: NgForm) {
        // Your form submission logic here
        console.log('Form Submitted!', contactForm.value);
    }
}

export class country {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
}




