import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeService, Badge } from '../services/badge.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-storyteller-badges',
  standalone: true,   // <- Added this to mark the component standalone
  imports: [CommonModule, FormsModule],  // <- Add imports for common directives like *ngIf, *ngFor
  templateUrl: './storyteller-badges.component.html',
  styleUrls: ['./storyteller-badges.component.css']
})
export class StorytellerBadgesComponent implements OnChanges {
  @Input() userId!: number;

  badges: Badge[] = [];
  loading = false;
  error = '';

  constructor(private badgeService: BadgeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['userId']) {
      this.loadBadges();
    }
  }

  loadBadges() {
    this.loading = true;
    this.error = '';
    this.badgeService.getStoryBadgesForUser(this.userId).subscribe({
      next: (badges) => {
        this.badges = badges;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load badges.';
        this.loading = false;
      }
    });
  }

  getBadgeColor(name: string): string {
    switch (name) {
      case 'Daily Storyteller':
        return '#F2994A'; // pastel orange
      case 'Rising Star':
        return '#FFD966'; // pastel yellow
      case 'Super Storyteller':
        return '#56CCF2'; // pastel blue
      default:
        return '#9B9B9B'; // gray default
    }
  }
}
