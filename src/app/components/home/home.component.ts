import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalConstants } from '../../common/global.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  title = 'bookstore-app';
  destroyed = new Subject<void>();
  currentScreenSize = '';
  amountColumns = 5;
  showSearchInput = true;

  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
            switch(this.currentScreenSize) {
              case GlobalConstants.screenSize.XLarge:
              case GlobalConstants.screenSize.Large:
                this.showSearchInput = true;
                this.amountColumns = 5;
                break;
              case GlobalConstants.screenSize.Medium:
                this.showSearchInput = true;
                this.amountColumns = 4;
                break;
              case GlobalConstants.screenSize.Small:
                this.showSearchInput = true;
                this.amountColumns = 3;
                break;
              case GlobalConstants.screenSize.XSmall:
                this.showSearchInput = false;
                this.amountColumns = 2;
                break;
              default:
                break;
            }
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
