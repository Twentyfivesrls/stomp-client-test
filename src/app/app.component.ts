import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxStompServiceService} from "./rxstomp/rx-stomp-service.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'stomp-client-test';

  textMessage = '';
  objectMessage: any;

  subscriptionText: any;
  subscriptionObject: any;
  constructor(
    // public wsService: WebsocketService
    private rxStompService: RxStompServiceService
  ) {
  }

  ngOnInit(): void {
    this.subscriptionText = this.rxStompService.watch('/customTopic').subscribe((message: any) => {
         this.textMessage = message.body;
      });
    this.subscriptionObject = this.rxStompService.watch('/objectTopic').subscribe((message: any) => {
      const jsonResponse = JSON.parse(message.body);
      this.objectMessage = jsonResponse.last_name;
    });
  }

  unsubScribeText(){
    this.subscriptionText.unsubscribe();
  }
  unsubScribeObject(){
    this.subscriptionObject.unsubscribe();
  }

  ngOnDestroy(): void {
    this.unsubScribeText();
    this.unsubScribeObject();
  }

}
