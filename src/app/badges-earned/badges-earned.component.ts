import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorytellerBadgesComponent } from '../storyteller-badges/storyteller-badges.component'; // 👈 adjust path


interface Badge {
  id: number;
  name: string;
  icon: string; // icon class or image path
  description: string;
  color: string; // background color
}

@Component({
  selector: 'app-badge-earned',
  templateUrl: './badges-earned.component.html',
  styleUrls: ['./badges-earned.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, StorytellerBadgesComponent]
})
export class BadgeEarnedComponent implements OnInit {
  badges: Badge[] = [];
  selectedCategory: string | null = null;
   userId: number | null = null; // initialized as null


  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? +storedUserId : null;
    this.badges = [
      {
        id: 1,
        name: 'Story Explorer',
        icon: 'fas fa-book-open',
        description: 'Completed 5 story quizzes',
        color: '#FFD966' // pastel yellow
      },
      {
        id: 2,
        name: 'Quiz Master',
        icon: 'fas fa-trophy',
        description: 'Scored 90% or above in quiz',
        color: '#6FCF97' // pastel green
      },
      {
        id: 3,
        name: 'Storyteller Star',
        icon: 'fas fa-feather-alt',
        description: 'Created 3 stories',
        color: '#56CCF2' // pastel blue
      },
      {
        id: 4,
        name: 'Daily Reader',
        icon: 'fas fa-calendar-check',
        description: 'Read stories 5 days in a row',
        color: '#F2994A' // pastel orange
      }
    ];
  }

  selectBadgeCategory(category: string) {
    this.selectedCategory = category;
  }
}

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { StorytellerBadgesComponent } from '../storyteller-badges/storyteller-badges.component'; // 👈 adjust path

// @Component({
//   selector: 'app-badge-earned',
//   templateUrl: './badges-earned.component.html',
//   styleUrls: ['./badges-earned.component.css'],
//   standalone: true,
//   imports: [CommonModule, FormsModule, StorytellerBadgesComponent] // 👈 include here
// })
// export class BadgeEarnedComponent implements OnInit {
//   badges = [];
//   selectedCategory: string | null = null;
//   userId = 101;

//     ngOnInit() {
//     this.badges = [
//       {
//         id: 1,
//         name: 'Story Explorer',
//         icon: 'fas fa-book-open',
//         description: 'Completed 5 story quizzes',
//         color: '#FFD966' // pastel yellow
//       },
//       {
//         id: 2,
//         name: 'Quiz Master',
//         icon: 'fas fa-trophy',
//         description: 'Scored 90% or above in quiz',
//         color: '#6FCF97' // pastel green
//       },
//       {
//         id: 3,
//         name: 'Storyteller Star',
//         icon: 'fas fa-feather-alt',
//         description: 'Created 3 stories',
//         color: '#56CCF2' // pastel blue
//       },
//       {
//         id: 4,
//         name: 'Daily Reader',
//         icon: 'fas fa-calendar-check',
//         description: 'Read stories 5 days in a row',
//         color: '#F2994A' // pastel orange
//       }
//     ];
//   }


//   selectBadgeCategory(category: string) {
//     this.selectedCategory = category;
//   }
// }
