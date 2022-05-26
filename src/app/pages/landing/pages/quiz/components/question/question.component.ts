import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit, OnDestroy {
  @Input() question: string = '';
  @Input() parent!: FormGroup;
  @Input() name!: string;

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      answer: [
        null,
        {
          updateOn: 'change',
          validator: [Validators.required],
        },
      ],
    });
  }

  get answer() {
    return this.form.get('answer');
  }

  ngOnInit(): void {
    this.parent.addControl(this.name, this.form);
  }

  ngOnDestroy(): void {
    this.parent.removeControl(this.name);
  }

  public errorHandling = (control: string, error: string) => {
    return this.form.controls[control].hasError(error);
  };
}
