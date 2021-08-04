import { Component, OnInit } from '@angular/core';
import { ShortTermGoalsService } from '../service/short-term-goals.service';

@Component({
  selector: 'app-short-term-goals',
  templateUrl: './short-term-goals.component.html',
  styleUrls: ['./short-term-goals.component.css']
})
export class ShortTermGoalsComponent implements OnInit {

  shortTermGoalList:any;

  constructor(public shortTermService:ShortTermGoalsService) { }

  ngOnInit(): void {
    this.shortTermService.getShortTermGoals().subscribe(data=>{
      this.shortTermGoalList= data.map(e => {
        return {
          goalName: e.payload.doc.data()['goalName']
        }
      })
    })
  }
  addTask(event: any): void{
    var allTasksList= event?.target.parentNode?.childNodes[0].childNodes[0].value;
    var goalName = {
      goalName: allTasksList
    }  
    console.log(goalName);
    
    this.shortTermService.insertShortTremRecord(goalName).then(res=>{
      console.log("short term record added");
    }).catch(err=>{
      console.log('error while inserting the records in firebase: '+err);
    });
    
    event.target.parentNode.childNodes[0].childNodes[0].value="";
  }

}
