import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LongTermGoalsService {
  
  constructor(public fireservices:AngularFirestore) { }

  insertLongTermRecord(shortTermGoal:any) {
    return this.fireservices.collection('longTermGoal').add(shortTermGoal);
  }
  getLongTermGoals() {
    return this.fireservices.collection('longTermGoal').snapshotChanges();
  }
}
