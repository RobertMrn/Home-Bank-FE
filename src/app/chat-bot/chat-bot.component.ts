import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ChatBotService} from "../Services/chat-bot-service";

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

  constructor(private chatBotService: ChatBotService) {
  }

  response = 'Hello, my name is Bot, how may I help you?';

  config = {
    title: 'CHATBOT',
    subtitle: ''
  };

  ngOnInit(): void {
  }

  getMessage($event: any) {
    this.chatBotService.getAnswerForChatBot($event).subscribe({
      next: resData => {
        this.response = resData.answer;
      },
      error: err => {
        this.response = "Sorry, I'm not available right now. Please try again later.";
      }
    })
  }

}
