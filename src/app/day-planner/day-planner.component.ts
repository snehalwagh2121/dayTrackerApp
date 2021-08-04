import { ViewEncapsulation } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DayPlannerModel } from '../model/day-planner-model';
import { DayPlannerService } from '../service/day-planner.service';

@Component({
  selector: 'app-day-planner',
  templateUrl: './day-planner.component.html',
  styleUrls: ['./day-planner.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DayPlannerComponent implements OnInit { 
  dailyTasksList: DayPlannerModel[]=[];
  checkedValue:boolean;
  
  dayPlannerModel:DayPlannerModel= {
    taskName:"",
    userId:undefined,
    createdDttm: undefined,
    taskId:undefined,
    isDone:false
  };

  constructor(public dayPlannerService:DayPlannerService) { }

  ngOnInit(): void {
    this.dayPlannerService.getDailyTasks().subscribe(data=>{
      this.dailyTasksList= data.map(e => {
        return {
          taskName: e.payload.doc.data()['taskName'],
          userId: e.payload.doc.data()['userId'],
          createdDttm: e.payload.doc.data()['createdDttm'],
          taskId: e.payload.doc.id,
          isDone: e.payload.doc.data()['isDone']
        }
      })
    })
  }

  addTask(event: any): void{
    var allTasksList= event?.target.parentNode?.childNodes[0].childNodes[0].value;
    var currentDate:Date= new Date();
    this.dayPlannerModel.taskName = allTasksList;
    this.dayPlannerModel.userId = 1;
    this.dayPlannerModel.createdDttm = currentDate;
    this.dayPlannerModel.taskId=null;
    this.dayPlannerModel.isDone=false;

    console.log(this.dayPlannerModel);
    
    this.dayPlannerService.insertDailyTaskRecord(this.dayPlannerModel).then(res=>{
      this.dayPlannerModel.taskName="";
      this.dayPlannerModel.userId=undefined;
      this.dayPlannerModel.createdDttm=undefined;
    }).catch(err=>{
      console.log('error while inserting the records in firebase: '+err);
    });
    
    event.target.parentNode.childNodes[0].childNodes[0].value="";
  }

  // onCheckboxChange(event:any){
  //   console.log(event?.target.id);
  //   var id=event?.target.id;
  //   this.checkedValue=event?.target.checked;
  //   console.log("checked: ", this.checkedValue);
    
  //   if(this.checkedValue== true){
  //     this.checkedValue= false;
  //   }else{
  //     this.checkedValue=true;
  //   }

  //   this.dayPlannerService.getRecordDetails(id).update({
  //         isDone: this.checkedValue
  //     });
  // }
}
