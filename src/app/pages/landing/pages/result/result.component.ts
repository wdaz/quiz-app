import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {
  getLocalStorage,
  removeLocalStorage,
} from '@app/shared/utils/localStorage';
import { UserService } from '@app/services/user/user.service';
import { User } from '@app/models';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  answers: [];
  oddResult: any;
  evenResult: any;
  result: number;
  user: User | null;

  constructor(private router: Router, private userService: UserService) {
    this.answers = getLocalStorage('answers') as [];
    this.oddResult = 0;
    this.evenResult = 0;
    this.result = 0;
    this.user = this.userService.currentUserValue;
  }

  isOdd(n: number) {
    return Math.abs(n % 2) == 1;
  }

  ngOnInit(): void {
    for (const i of this.answers) {
      const key = +Object.keys(i)[0];
      if (this.isOdd(key)) {
        this.oddResult += +i[key];
      } else {
        this.evenResult += +i[key];
      }
    }

    this.result = this.evenResult - this.oddResult;
  }

  startAgain() {
    removeLocalStorage('answers', 'currentUser');
    this.router.navigate(['welcome']);
  }
}
