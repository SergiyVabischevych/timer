import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private initialMoment: moment.Moment;
  private startSubscription: Subscription;
  private readonly timerSbj$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.getFormattingTimerString(moment().startOf('year'))
  );

  getInitialMoment(): Observable<string> {
    return this.timerSbj$.asObservable();
  }

  startTimer(): void {
    if (!this.startSubscription) {
      this.initialMoment = this.initialMoment ? this.initialMoment : this.getNow();
      this.startSubscription = timer(0, 1000)
        .subscribe(
          () => this.timerSbj$.next(
            this.getFormattingTimerString(this.addSeconds(this.initialMoment, 1))
          )
        );
    }
  }

  stopTimer(): void {
    if (this.startSubscription) {
      this.startSubscription.unsubscribe();
      this.startSubscription = null;
    }
  }

  resetTimer(): void {
    this.stopTimer();
    this.initialMoment = null;
    this.timerSbj$.next(this.getFormattingTimerString(this.getNow()));
  }

  waitTimer(): void {

  }

  private getFormattingTimerString(time: moment.Moment): string {
    return time.format(moment.HTML5_FMT.TIME_SECONDS);
  }

  private addSeconds(time: moment.Moment, second: number): moment.Moment {
    return time.add(second, 'second');
  }

  private getNow(): moment.Moment {
    return moment().startOf('year');
  }
}
