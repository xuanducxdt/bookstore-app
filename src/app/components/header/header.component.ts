import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() showSearchInput = true;

  constructor(private router: Router) {}

  goToPage(pageName: string): void {
    console.log('pageName:', pageName)
    this.router.navigate([`/${pageName}`])
  }
}
