import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth-service';
import { from, map, skip, take } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authService = inject(AuthService)
  router = inject(Router)

  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required])
  })


  onSubmit(event: Event) {

    if (this.form.valid) {      
      this.authService.login(this.form.value).subscribe((res) => {
        this.router.navigate([''])
      })
    }
  }
} 
 