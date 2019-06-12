import { ChangeDetectorRef, Component } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  time$: Observable<string>;

  constructor(private readonly cdr: ChangeDetectorRef) {
    const date: moment.Moment = moment().startOf('year');
    this.time$ = interval(1000)
      .pipe(
        map((time: number) => date.add(1, 'second').format(moment.HTML5_FMT.TIME_SECONDS)),
      );
  }
}
