import { Router } from '@angular/router';
import { getLocalStorage } from './../../../../shared/utils/localStorage';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { setLocalStorage } from '@app/shared/utils/localStorage';
import { markFormGroupTouched } from '@app/shared/utils/form';
import { Quiz } from '@app/models/quiz';

import { QuizService } from '@app/services/quiz/quiz.service';
import { UserService } from '@app/services/user/user.service';
import { User } from '@app/models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  page: number;
  quizzes: Quiz[];
  form: FormGroup;
  user: User | null;
  answers: any;

  constructor(
    private quizService: QuizService,
    private userService: UserService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.form = this.fb.group({});
    this.page = 1;
    this.quizzes = [];
    this.user = this.userService.currentUserValue;
    this.answers = [];
  }

  ngOnInit(): void {
    this.getQuizzes();
  }

  private getQuizzes() {
    this.quizService.allQuizzes(this.page).subscribe((quizzes) => {
      this.quizzes = quizzes;
      this.page += 1;
    });
  }

  next() {
    if (this.form.invalid) {
      markFormGroupTouched(this.form);
      this.form.updateValueAndValidity();
      this.cdr.detectChanges();
      return;
    }

    if (this.form.valid) {
      for (const key in this.form.value) {
        if (Object.prototype.hasOwnProperty.call(this.form.value, key)) {
          const element = this.form.value[key];
          this.answers = [...this.answers, { [key]: element.answer }];
        }
      }
      setLocalStorage('answers', this.answers);
    }

    if (this.page < 3) this.getQuizzes();
    if (this.page === 3) {
      this.router.navigate(['result']);
    }
  }
}
