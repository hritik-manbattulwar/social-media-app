import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'momentTime'
})
export class MomentTimePipe implements PipeTransform {

  transform(date: Date,): unknown {
    return moment(date).fromNow()
  }

}
