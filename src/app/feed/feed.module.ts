import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentTimePipe } from '../profile/pipes/moment-time.pipe';
import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';


@NgModule({
  declarations: [
    FeedComponent,
    MomentTimePipe
  ],
  imports: [
    CommonModule,
    FeedRoutingModule,

  ]
})
export class FeedModule { }
