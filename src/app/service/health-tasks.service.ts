import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HealthTasksModel } from '../model/health-tasks-model';

@Injectable({
  providedIn: 'root'
})
export class HealthTasksService {
  healthTaskList:any[]=[];

  constructor(public fireservices:AngularFirestore) {  }

  getHealthTasks(){
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    return this.fireservices.collection('doneHealthTask', ref=> ref.where('createdDttm',">=", date)).snapshotChanges();
   }

  insertHealthTaskRecord(healthTaskModel:HealthTasksModel){
    return this.fireservices.collection('doneHealthTask').add(healthTaskModel);
  }

  deleteHealthTaskId(healthTaskId:string){
    console.log("document to be deleted: ", healthTaskId);
    this.fireservices.collection('doneHealthTask').doc(healthTaskId).delete().then(()=>{
      console.log("Document successfully deleted");
    }).catch((err)=>{
      console.log("error while removing the documnet: ", err);
    });
  }
}
