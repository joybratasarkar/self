
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  destroyed = new Subject<void>();
  currentScreenSize!: string;
  user!: SocialUser;
  loggedIn!: boolean;
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor(breakpointObserver: BreakpointObserver,
    private authService: SocialAuthService
    ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result:any) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize = this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });

      this.authService.authState.subscribe(
        {
          next: (response: any) => {
            debugger;
            this.user = response;
            this.loggedIn = (response != null);
  
          },
          error: (error: any) => {
            debugger;
            console.log('error', error);
  
          }
        }
      );
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}

