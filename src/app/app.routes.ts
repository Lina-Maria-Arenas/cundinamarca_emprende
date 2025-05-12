import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { FormContainerComponent } from './views/form-container/form-container.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'form', component: FormContainerComponent },
 
];