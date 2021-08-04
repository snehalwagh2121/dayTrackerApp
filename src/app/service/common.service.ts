import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  constructor() { }

  longTermGoal() {
    var shortTerm= document.getElementById("longTerm");
    console.log(shortTerm.classList.toggle('hide'));
  }
  shortTermGoal() {
    var shortTerm= document.getElementById("shortTerm");
    console.log(shortTerm.classList.toggle('hide'));
  }
}
