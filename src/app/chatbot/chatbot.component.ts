import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  messages: any[] = [];
  inputMessage: string = '';
  loading: boolean = false;
  isTyping: boolean = false;
  adminId: string = '';
  sessionId: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.adminId = this.getAdminId(); // From auth service
    this.sessionId = this.generateSessionId();

    // Welcome message
    setTimeout(() => {
      this.messages.push({
        type: 'assistant',
        content: 'Hello! I\'m your AI assistant. How can I help you today?',
        timestamp: new Date(),
      });
    }, 500);
  }

  sendMessage() {
    if (!this.inputMessage.trim()) return;

    // Add user message to chat
    this.messages.push({
      type: 'user',
      content: this.inputMessage,
      timestamp: new Date(),
    });

    const userMessage = this.inputMessage;
    this.inputMessage = '';
    this.loading = true;
    this.isTyping = true;

    // Call backend chatbot API
    this.http
      .post('/api/chatbot/chat', {
        message: userMessage,
        adminId: this.adminId,
        sessionId: this.sessionId,
      })
      .subscribe(
        (response: any) => {
          // Simulate typing delay
          setTimeout(() => {
            this.isTyping = false;
            // Add bot response to chat
            this.messages.push({
              type: 'assistant',
              content: response.message,
              data: response.events || response.data || null,
              timestamp: new Date(),
            });
            this.loading = false;
          }, 1000);
        },
        (error) => {
          console.error('Error:', error);
          setTimeout(() => {
            this.isTyping = false;
            this.messages.push({
              type: 'assistant',
              content: 'Sorry, something went wrong. Please try again.',
              timestamp: new Date(),
            });
            this.loading = false;
          }, 1000);
        }
      );
  }

  private getAdminId(): string {
    // Get from authentication service
    return 'admin-123';
  }

  private generateSessionId(): string {
    return 'sess-' + Math.random().toString(36).substring(7);
  }
}
