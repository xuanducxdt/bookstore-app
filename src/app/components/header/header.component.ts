import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() showSearchInput = true;

  constructor(private router: Router, private authService: AuthService) {}

  goToPage(pageName: string): void {
    this.router.navigate([`/${pageName}`])
  }

  onSignOut(): void {
    this.authService.deleteCookie('token');
    this.authService.deleteCookie('role');
    this.goToPage('login');
  }
}
