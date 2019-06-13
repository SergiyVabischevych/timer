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

  private clicked = 0;

  @ViewChild('waitBtn', { static: false }) waitBtn!: ElementRef<HTMLButtonElement>;

  constructor(private readonly timerService: TimerService) {
  }

  ngAfterViewInit(): void {
    fromEvent(this.waitBtn.nativeElement, 'click')
      .pipe(
        tap(e => this.clicked++),
        delay(300),
      )
      .subscribe(() => {
        if (this.clicked === 2) {
          this.wait();
        } else {
          this.clicked = 0;
        }
      });
  }

  startStop(): void {
    if (this.btnName === StartStop.Start) {
      this.btnName = StartStop.Stop;
      this.timerService.startTimer();
    } else {
      this.btnName = StartStop.Start;
      this.timerService.stopTimer();
    }
  }

  wait(): void {
    this.btnName = StartStop.Start;
    this.timerService.stopTimer();
  }

  reset(): void {
    this.timerService.resetTimer();
  }
}
