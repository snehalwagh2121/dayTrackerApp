import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DayPlannerModel } from '../model/day-planner-model';

@Injectable({
  providedIn: 'root'
})
export class DayPlannerService {
  constructor(public fireservices:AngularFirestore) { }

  getDailyTasks() {
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    return this.fireservices.collection('dailyTasks', ref=> ref.where('createdDttm',">=", date)).snapshotChanges();
  }

  insertDailyTaskRecord(dayPlannerModel: DayPlannerModel) {
    return this.fireservices.collection('dailyTasks').add(dayPlannerModel);
  }


  getRecordDetails(id:string){
    return this.fireservices.collection('dailyTasks').doc(id);
  }
}
