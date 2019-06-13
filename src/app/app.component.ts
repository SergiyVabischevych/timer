import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { TimerService } from './services';

enum StartStop {
  Start = 'Start',
  Stop = 'Stop',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  time$: Observable<string> = this.timerService.getInitialMoment();
  btnName: string = StartStop.Start;

  private waitBtnClicked = 0;

  @ViewChild('waitBtn', { static: false }) waitBtn!: ElementRef<HTMLButtonElement>;

  constructor(private readonly timerService: TimerService) {
  }

  ngAfterViewInit(): void {
    fromEvent(this.waitBtn.nativeElement, 'click')
      .pipe(
        tap(() => this.waitBtnClicked++),
        delay(300),
      )
      .subscribe(() => {
        if (this.waitBtnClicked === 2) {
          this.wait();
        }
        this.waitBtnClicked = 0;
      });
  }

  startStop(): void {
    if (this.btnName === StartStop.Start) {
      this.setBtnStop();
      this.timerService.startTimer();
    } else {
      this.setBtnStart();
      this.timerService.stopTimer();
    }
  }

  wait(): void {
    this.setBtnStart();
    this.timerService.stopTimer();
  }

  reset(): void {
    this.setBtnStart();
    this.timerService.resetTimer();
  }

  isBtnStart(): boolean {
    return this.btnName === StartStop.Start;
  }

  isBtnStop(): boolean {
    return this.btnName === StartStop.Stop;
  }

  private setBtnStart(): void {
    this.btnName = StartStop.Start;
  }

  private setBtnStop(): void {
    this.btnName = StartStop.Stop;
  }

}
