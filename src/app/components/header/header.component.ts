import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() showSearchInput = true;

  cartCount: number = 0;

  constructor(private router: Router, private authService: AuthService, private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCarts().subscribe((res) => {
      this.cartService.setCartCount({ cartCount: res.data.length });
    });
    this.cartService.getCartCount().subscribe((value) => {
      this.cartCount = value.cartCount;
    });
  }

  goToPage(pageName: string): void {
    this.router.navigate([`/${pageName}`])
  }

  onSignOut(): void {
    this.authService.deleteCookie('token');
    this.authService.deleteCookie('role');
    this.goToPage('login');
  }
}
