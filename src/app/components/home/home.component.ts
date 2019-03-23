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

    this.socketService.onEvent('update').subscribe((res: any) => {
      this.toon = res.toon;
      this.bob = res.bob;
    });
  }

}
