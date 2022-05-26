import { getLocalStorage } from './../../shared/utils/localStorage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { v4 } from 'uuid';

import { User } from '@app/models/user';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  private baseApi = environment.baseApi;
  private currentUser: BehaviorSubject<User | null>;

  constructor(private $http: HttpClient) {
    this.currentUser = new BehaviorSubject(
      getLocalStorage<User>('currentUser')
    );
  }

  get currentUserValue() {
    return this.currentUser.value ? this.currentUser.value : null;
  }

  createUser(username: string): Observable<User> {
    const user: User = {
      id: v4(),
      username,
    };

    return this.$http.post<User>(this.baseApi + 'users', user);
  }
}
