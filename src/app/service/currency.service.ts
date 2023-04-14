import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  //teniamo traccia della valuta selezionata dall'user e la usiamo in tutti i componenti
  private selectedCurrency : BehaviorSubject<string> = new BehaviorSubject<string>("EUR");
  constructor() { }

  getCurrency(){
    return this.selectedCurrency.asObservable();
  }
  setCurrency(currency : string){
    this.selectedCurrency.next(currency);
  }
}
