import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { AccessType, Users } from '../shared/user.model';

@Component({
  selector: 'app--register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  basicInfo: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    accessType: ['', Validators.required],
    civility: ['', Validators.required]
  });

  loginInfo: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
  });
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _matDialogRef: MatDialogRef<LoginComponent>,
  ) { }

  ngOnInit() {
    this.basicInfo = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      accessType: ['', Validators.required],
      civility: ['', Validators.required]
    });
    this.loginInfo = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirmation: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    const user = new Users();
    user.login = this.loginInfo.get('email')?.value;
    user.password = this.loginInfo.get('password')?.value;
    if (this.loginInfo.valid) {
      const login = new Users();
      login.login = this.loginInfo.get('email')?.value;
      login.password = this.loginInfo.get('password')?.value;
      login.lastName = this.basicInfo.get('lastName')?.value;
      login.firstName = this.basicInfo.get('firstName')?.value;
      login.accessType = this.basicInfo.get('accessType')?.value;
      login.civility = this.basicInfo.get('civility')?.value;
      login.uploadedPicture = '';
      login.lastUpdateDate = new Date();
      login.picture = '';
      this.register(login);
      this._matDialogRef.close();
    }
  }


  register(login :Users) {
    this.authService.postRegister(login.login, login.password, login.lastName, login.firstName, login.accessType as AccessType, login.civility).subscribe(
      (response) => {
        if (response.message !== 'MERDE') {
          this.router.navigate(['/home']);
        }
      }
    );
  }
}