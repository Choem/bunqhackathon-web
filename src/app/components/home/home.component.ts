import { Component, OnInit } from '@angular/core';
import {SocketService} from '../../services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public toon;
  public bob;

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.socketService.initSocket();

    this.socketService.onConnection();

    this.socketService.onEvent('update').subscribe(async (res: any) => {
      this._animate(res.toon);
      this._animate(res.bob, false);
    });
  }

  private async _animate(res: any, isTonno = true) {
    for (let i = 0; i < res + 1; i++) {
      setTimeout(() => {
        if (isTonno) {
          this.toon = i;
        } else {
          this.bob = i;
        }
      }, 1 * i);
    }
  }

}
