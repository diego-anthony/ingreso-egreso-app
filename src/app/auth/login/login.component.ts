import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;
  uiSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.uiSubscription = this._store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  login() {
    if (this.loginForm.valid) {

      this._store.dispatch(uiActions.startLoading())
      const { email, password } = this.loginForm.value;
      this._authService.login(email, password).then(x => {
        this._store.dispatch(uiActions.stopLoading())
        this._router.navigate(['/']);
      }
      )
        .catch(err => {
          console.log(err);
          this._store.dispatch(uiActions.stopLoading())
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          });
        });
    }
  }

}
