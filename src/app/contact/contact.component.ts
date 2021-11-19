import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactType, Feedback} from "../shared/feedback";
import {expand, visibility} from "../animations/app.animations";
import {FeedbackService} from "../service/feedback.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    visibility(),
    expand()
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback | undefined;
  feedbackFromServer: Feedback | undefined;
  contactType = ContactType;
  @ViewChild('fform')
  feedbackFormDirective: any;
  errMess: string | undefined;
  visibility = 'shown';
  visibilityFeedBack = 'hidden';

  formErrors: any = {
    "firstname": "",
    "lastname": "",
    "telnum": "",
    "email": ""
  };

  validationMessages: any = {
    "firstname": {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters.',
    },
    "lastname": {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters.',
    },
    "telnum": {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers',
    },
    "email": {
      'required': 'Email is required.',
      'email': 'Email not in valid format.',
    }
  }

  constructor(private fb: FormBuilder, private feedbackService: FeedbackService) {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: [0, [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();//reset form validation messages
  }

  ngOnInit() {
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = "";
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    this.visibility = 'hidden';
    this.feedbackService.submitFeedback(this.feedback)
      .subscribe(feedback => {
          console.log(feedback);
          this.feedbackFromServer = feedback;
          this.visibilityFeedBack = 'shown';
          this.feedback = undefined;
          setTimeout(() => {
            this.visibility = 'shown';
            this.visibilityFeedBack = 'hidden';
            this.feedbackFromServer = undefined;
          }, 5000);
        },
        errmess => {
          this.errMess = <any>errmess;
        });
    this.feedbackFormDirective.resetForm();
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }
}
