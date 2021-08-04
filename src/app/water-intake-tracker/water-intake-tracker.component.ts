import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-water-intake-tracker',
  templateUrl: './water-intake-tracker.component.html',
  styleUrls: ['./water-intake-tracker.component.css']
})
export class WaterIntakeTrackerComponent implements OnInit {

  image1:number=0;image2:number=0;image3:number=0;image4:number=0;image5:number=0;image6:number=0;image7:number=0;image8:number=0;

  constructor() { }

  ngOnInit(): void {
  }

  rotate90( id:string){
    console.log("id : "+id);
    var bottle= document.getElementById(id);
    if(bottle!=null){ 
      if(bottle.classList.contains("up")){
        bottle.style.transform='rotate(180deg)';
      }else{
        bottle.style.transform='rotate(360deg)';
      }
      bottle.classList.toggle('up');
    }
  }
}
