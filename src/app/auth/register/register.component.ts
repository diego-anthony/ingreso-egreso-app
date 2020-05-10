import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  uiSubscription: Subscription;
  isLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>) { }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this._store.select('ui').subscribe(ui => {
      this.isLoading = ui.isLoading;
    });
  }

  register() {
    if (this.registerForm.valid) {
      this._store.dispatch(uiActions.startLoading());
      const { name, email, password } = this.registerForm.value;
      this._authService.register(name, email, password).then(() => {
        this._store.dispatch(uiActions.stopLoading());
        this._router.navigate(['/']);
      }
      )
        .catch(err => {
          console.log(err);

          this._store.dispatch(uiActions.stopLoading());
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err,
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }
}
