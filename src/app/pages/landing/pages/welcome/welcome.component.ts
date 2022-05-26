import { setLocalStorage } from './../../../../shared/utils/localStorage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/services/user/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: [
        null,
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    });
  }

  ngOnInit(): void {}

  get username() {
    return this.form.get('username')?.value;
  }

  getErrorMessage() {
    return this.form.get('username')?.hasError('required')
      ? 'You must enter a value'
      : '';
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  };

  submitForm() {
    if (this.form.invalid) return;
    this.userService.createUser(this.username).subscribe((user) => {
      setLocalStorage('currentUser', user);
      this.router.navigate(['/quiz']);
    });
  }
}
