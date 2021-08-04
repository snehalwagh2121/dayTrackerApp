import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShortTermGoalsService {

  constructor(public fireservices:AngularFirestore) { }

  getShortTermGoals() {
    return this.fireservices.collection('shortTermGoal').snapshotChanges();
  }
  insertShortTremRecord(shortTermGoal: any) {
    return this.fireservices.collection('shortTermGoal').add(shortTermGoal);
  }
}
