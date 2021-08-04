import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShortTermGoalsComponent } from './short-term-goals/short-term-goals.component';
import { LongTermGoalsComponent } from './long-term-goals/long-term-goals.component';
import { AllTasksComponent } from './all-tasks/all-tasks.component';
import { HealthTasksComponent } from './health-tasks/health-tasks.component';
import { StatsComponent } from './stats/stats.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DayPlannerComponent } from './day-planner/day-planner.component';
import { WaterIntakeTrackerComponent } from './water-intake-tracker/water-intake-tracker.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule } from '@angular/forms';

import { AllTasksService } from './service/all-tasks.service';

@NgModule({
  declarations: [
    AppComponent,
    ShortTermGoalsComponent,
    LongTermGoalsComponent,
    AllTasksComponent,
    HealthTasksComponent,
    StatsComponent,
    NavBarComponent,
    DayPlannerComponent,
    WaterIntakeTrackerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [AllTasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
