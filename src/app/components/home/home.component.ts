import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from '../../services/socket.service';
import {CountUp} from 'countup.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public toonCountUp: any;
  public bobCountUp: any;

  public toon;
  public bob;

  public firstTime = true;

  public options: any = {
    prefix: '&euro;',
    decimalPlaces: 2
  };

  constructor(
    private socketService: SocketService
  ) {
  }

  ngOnInit() {
    this.socketService.initSocket();

    this.socketService.onConnection();
  }

  ngAfterViewInit(): void {
    this.socketService.onEvent('update').subscribe(async (res: any) => {
      if (this.firstTime) {
        this.firstTime = false;

        this.toonCountUp = new CountUp('toonSpan', res.toon, this.options);
        if (!this.toonCountUp.error) {
          this.toonCountUp.start();
        } else {
          console.error(this.toonCountUp.error);
        }

        this.bobCountUp = new CountUp('bobSpan', res.bob, this.options);
        this.toonCountUp.start();
        this.bobCountUp.start();
      } else {
        this.toonCountUp.update(res.toon);
        this.bobCountUp.update(res.bob);
      }
    });

  }


}


