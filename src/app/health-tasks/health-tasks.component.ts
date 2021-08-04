import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HealthTasksModel } from '../model/health-tasks-model';
import { HealthTasksService } from '../service/health-tasks.service';

@Component({
  selector: 'app-health-tasks',
  templateUrl: './health-tasks.component.html',
  styleUrls: ['./health-tasks.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HealthTasksComponent implements OnInit {

  healthTaskModel:HealthTasksModel= {
    heathTaskName:"",
    heathTaskTime:"",
    createdDttm: undefined,
    healthTaskId:undefined
  };

  healthTaskList:HealthTasksModel[];

  constructor(public healthService:HealthTasksService) {   }

  ngOnInit(): void {
    this.healthService.getHealthTasks().subscribe(data=>{
      this.healthTaskList= data.map(e => {
        return {
          heathTaskName: e.payload.doc.data()['heathTaskName'],
          heathTaskTime: e.payload.doc.data()['heathTaskTime'],
          createdDttm: e.payload.doc.data()['createdDttm'],
          healthTaskId: e.payload.doc.id,
        }
      })
    })
    console.log("health task list: ")
    console.log(this.healthTaskList);
  }

  addTask(event: any): void{
    var healthTasksList= event?.target.parentNode?.parentNode?.childNodes[1];
    var currentDate:Date= new Date();
    this.healthTaskModel.heathTaskName = event?.target.parentNode.childNodes[0].childNodes[0].value;
    this.healthTaskModel.heathTaskTime = event?.target.parentNode.childNodes[0].childNodes[1].value;
    this.healthTaskModel.createdDttm = currentDate;
    this.healthTaskModel.healthTaskId= null;

    event.target.parentNode.childNodes[0].childNodes[0].value="";
    event.target.parentNode.childNodes[0].childNodes[1].value="";

    this.healthService.insertHealthTaskRecord(this.healthTaskModel).then(res=>{
      this.healthTaskModel.heathTaskName="";
      this.healthTaskModel.heathTaskTime="";
      this.healthTaskModel.createdDttm=undefined;
    }).catch(err=>{
      console.log('error while inserting the records in firebase: '+err);
    });

  }

  deleteTask(event:any){
    var clickedElement= event?.target; 
    if(clickedElement.classList.contains("deleteI")) {
      var task= event?.target.parentNode.parentNode.parentNode;
      var deleteId= event?.target.parentNode.parentNode.parentNode.childNodes[0].innerHTML;
      console.log("all tAsks id to be deleted: "+deleteId);
      this.healthService.deleteHealthTaskId(deleteId);
      task.remove();
    }else{
      console.log("clicked somewhere else");
    }
  }
}
