import { Component, OnInit } from '@angular/core';
import { StoryService } from '../services/story.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-story-telling',
  imports: [CommonModule, FormsModule],
  templateUrl: './story-telling.component.html',
  styleUrls: ['./story-telling.component.css']
})
export class StoryTellingComponent implements OnInit {
  story: any;
  userRetelling: string = '';
  result: any;
  userId: number = 101; // mock user

  recognizing: boolean = false;
  recognition: any;

  constructor(private storyService: StoryService) {}

  ngOnInit() {
    this.loadStory();

    // Initialize SpeechRecognition if available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        this.userRetelling = transcript;
      };

      this.recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event);
      };

      this.recognition.onend = () => {
        this.recognizing = false;
      };
    }
  }

  // loadStory() {
  //   this.storyService.getRandomStory(2).subscribe(res => {
  //     this.story = res;
  //     this.result = null;
  //     this.userRetelling = '';
  //   });
  // }
  loadStory() {
  this.storyService.getStories().subscribe(res => {
    // Filter by yearGroup if needed
    const stories = res.filter(s => s.yearGroup === 2);

    if (stories.length > 0) {
      const randomIndex = Math.floor(Math.random() * stories.length);
      this.story = stories[randomIndex];
    } else {
      this.story = null;
    }

    this.result = null;
    this.userRetelling = '';
  });
}


  playStory() {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(this.story.storyText);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  }

  toggleRecording() {
    if (!this.recognition) {
      alert('Speech recognition not supported in this browser.');
      return;
    }
    if (this.recognizing) {
      this.recognition.stop();
      this.recognizing = false;
    } else {
      this.userRetelling = ''; // reset before recording
      this.recognition.start();
      this.recognizing = true;
    }
  }

  submitAttempt() {
    const attempt = {
      storyId: this.story.storyId,
      userId: this.userId,
      attemptText: this.userRetelling
    };

    this.storyService.submitAttempt(attempt).subscribe(res => {
      this.result = res;
    });
  }
}
