import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-crypto-api';
  selectedCurrency : string ='EUR'

  constructor(){
  }
  changeCurrency(event:string){
    console.log(event)
  }
}
