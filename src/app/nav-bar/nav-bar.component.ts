import { Component, OnInit } from '@angular/core';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public commonService:CommonService) { }

  ngOnInit(): void {
  }

  shortTermGoalDisplay(){
    this.commonService.shortTermGoal();
  }
  longTermGoalDisplay(){
    this.commonService.longTermGoal();
  }
}
