import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '@app/models';
import { environment } from '../../../environments/environment';

@Injectable()
export class QuizService {
  private baseApi = environment.baseApi;
  constructor(private $http: HttpClient) {}

  allQuizzes(page: number, limit: number = 5) {
    return this.$http.get<Quiz[]>(
      this.baseApi + 'quiz?_page=' + page + '&_limit=' + limit
    );
  }
}
