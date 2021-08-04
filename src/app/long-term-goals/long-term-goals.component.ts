import { Component, OnInit } from '@angular/core';
import { LongTermGoalsService } from '../service/long-term-goals.service';

@Component({
  selector: 'app-long-term-goals',
  templateUrl: './long-term-goals.component.html',
  styleUrls: ['./long-term-goals.component.css']
})
export class LongTermGoalsComponent implements OnInit {

  longTermGoalList:any;

  constructor(public longTermService:LongTermGoalsService) { }

  ngOnInit(): void {
    this.longTermService.getLongTermGoals().subscribe(data=>{
      this.longTermGoalList= data.map(e => {
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
    
    this.longTermService.insertLongTermRecord(goalName).then(res=>{
      console.log("short term record added");
    }).catch(err=>{
      console.log('error while inserting the records in firebase: '+err);
    });
    
    event.target.parentNode.childNodes[0].childNodes[0].value="";
  }

}
