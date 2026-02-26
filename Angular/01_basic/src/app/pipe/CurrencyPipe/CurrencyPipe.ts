import { CurrencyPipe } from "@angular/common";
import { Component } from "@angular/core";

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
    selector: 'route-currency-pipe',
    imports: [CurrencyPipeComponent],
    standalone: true,
    templateUrl: './CurrencyPipe.html',
})

export class  RouteCurrencyPipe {

}
