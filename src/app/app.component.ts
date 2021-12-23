import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bookstore-app';
  redirectToLogin = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.redirectToLogin) this.router.navigate(['/login']);
  }
}
