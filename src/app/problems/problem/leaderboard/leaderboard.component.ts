import { Component, OnInit } from '@angular/core';

import { SharingService } from '../shared';
import { AuthService, RepositoryService, SuccessfulSubmission } from '../../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.component.html',
  styleUrls: ['leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  topSubmissions: SuccessfulSubmission[];

  constructor(
      private authService: AuthService,
      private sharingService: SharingService,
      private repoService: RepositoryService) { }

  ngOnInit() {
    this.sharingService.problemObservable.subscribe(
        problem => {
          if (problem) {
            this.repoService.getLeaderboard(problem.$key).subscribe(
                topSubmissions => this.topSubmissions = topSubmissions);
          }
        });
  }
}
