import { Component, Input, OnInit } from '@angular/core';
import { SuccessfulSubmission, RepositoryService, User } from '../../../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-ranking',
  templateUrl: 'ranking.component.html',
  styleUrls: ['ranking.component.css']
})
export class RankingComponent implements OnInit {
  @Input() rank: number;
  @Input() submission: SuccessfulSubmission;
  submitter: User;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.repoService.getUser(this.submission.submitterUid).subscribe(
        user => this.submitter = user);
  }
}
