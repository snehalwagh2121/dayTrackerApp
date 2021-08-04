import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AllTaskModel } from '../model/all-task-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllTasksService {

  constructor(public fireservices:AngularFirestore) {   }

   getAllTask(){
    var date = new Date();
    date.setHours(0, 0, 0, 0);
    return this.fireservices.collection('doneAllTasks', ref=> ref.where('currentTimestamp',">=", date)).snapshotChanges();
   }

  insertAllTaskRecord(allTaskModel:AllTaskModel){
    return this.fireservices.collection('doneAllTasks').add(allTaskModel);
  }

  deleteAllTaskId(allTasksId:string){
    console.log("document to be deleted: ", allTasksId);
    this.fireservices.collection('doneAllTasks').doc(allTasksId).delete().then(()=>{
      console.log("Document successfully deleted");
    }).catch((err)=>{
      console.log("error while removing the documnet: ", err);
    });
  }
}
