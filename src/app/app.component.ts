import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dayTrackerApp';

  dayPlannerToggle(){
    var daily_tasks= document.getElementById("dayPlanner");
    var dayPlannerTab= document.getElementById("dayPlannerTab");
    console.log("toggling between day planner")
    if(daily_tasks!=null && dayPlannerTab!=null){
      daily_tasks.classList.toggle("hide");
    }
  }


}
