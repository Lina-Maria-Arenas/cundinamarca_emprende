import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // In a real app, this would call an API
    if (username && password) {
      this.isLoggedInSubject.next(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/']);
  }
}