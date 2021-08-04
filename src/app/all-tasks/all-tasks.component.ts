import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { AllTasksService } from '../service/all-tasks.service';
import { AllTaskModel } from '../model/all-task-model';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AllTasksComponent implements OnInit {

  allTaskModel:AllTaskModel= {
    allTaskName:"",
    allTaskTime:"",
    currentTimestamp: undefined,
    allTasksId:undefined,
  };

  allTaskList: AllTaskModel[];

  constructor(public allTaskService:AllTasksService) { 
  }

  ngOnInit(){
    this.allTaskService.getAllTask().subscribe(data=>{
      this.allTaskList= data.map(e => {
        return {
          allTaskName: e.payload.doc.data()['allTaskName'],
          allTaskTime: e.payload.doc.data()['allTaskTime'],
          currentTimestamp: e.payload.doc.data()['currentTimestamp'],
          allTasksId: e.payload.doc.id,
        }
      })
    })
  }

  addTask(event: any): void{
    var allTasksList= event?.target.parentNode?.parentNode?.childNodes[1];
    var currentDate:Date= new Date();
    this.allTaskModel.allTaskName = event?.target.parentNode.childNodes[0].childNodes[0].value;
    this.allTaskModel.allTaskTime = event?.target.parentNode.childNodes[0].childNodes[1].value;
    this.allTaskModel.currentTimestamp = currentDate;
    this.allTaskModel.allTasksId=null;

    this.allTaskService.insertAllTaskRecord(this.allTaskModel).then(res=>{
      this.allTaskModel.allTaskName="";
      this.allTaskModel.allTaskTime="";
      this.allTaskModel.currentTimestamp=undefined;
    }).catch(err=>{
      console.log('error while inserting the records in firebase: '+err);
    });

    event.target.parentNode.childNodes[0].childNodes[0].value="";
    event.target.parentNode.childNodes[0].childNodes[1].value="";
  }

  deleteTask(event:any){
    var clickedElement= event?.target; 
    if(clickedElement.classList.contains("deleteI")) {
      var task= event?.target.parentNode.parentNode.parentNode;
      var deleteId= event?.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
      console.log("all tAsks id to be deleted: "+deleteId);
      this.allTaskService.deleteAllTaskId(deleteId);
      task.remove();
    }else{
      console.log("clicked somewhere else");
    }
  }
  
}
