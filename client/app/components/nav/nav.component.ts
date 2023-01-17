import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router ) {}


  checkLogin() {
    return this.authenticationService.isUserLoggedIn();
  };

  logout(): void {
    this.authenticationService.logout();
    this.router.navigateByUrl("/");
  }
}
