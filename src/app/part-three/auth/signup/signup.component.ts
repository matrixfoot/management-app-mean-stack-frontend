import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      direction: [null, Validators.required],
      fonction: [null, Validators.required],
      role: [ "basic",Validators.required],
    });
  }

  onSignup() {
    this.loading = true;
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const firstname = this.signupForm.get('firstname').value;
    const lastname = this.signupForm.get('lastname').value;
    const fonction = this.signupForm.get('fonction').value;
    const direction = this.signupForm.get('direction').value;
    const role = this.signupForm.get('role').value;
    this.auth.createNewUser(email, password,firstname,lastname,fonction,direction,role).then(
      () => {
        this.loading = false;
        if (this.state.part === 3) {
          this.router.navigate(['/part-four/all-projet']);
        } else if (this.state.part === 4) {
          this.router.navigate(['/part-four/all-projet']);
        }
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }
}
