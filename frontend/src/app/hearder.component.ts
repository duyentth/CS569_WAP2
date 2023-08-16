import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, initial_state_value } from './user/user.service';

@Component({
  selector: 'app-hearder',
  template: `
    <header>
      <nav>
        <ul>
          <li><a [routerLink]="['']">Home</a></li>
          <li><a [routerLink]="['', 'group', 'list']">Groups</a></li>
          <li><a [routerLink]="['', 'group', 'add']">Create group</a></li>
          <li>
            <a [routerLink]="['', 'group', 'request']">Pending Request</a>
          </li>
          <li>
            <a *ngIf="isSignedIn" [routerLink]="['']" (click)="logout()"
              >Logout</a
            >
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: [
    `
      header {
        background-color: #cbecf2;
        position: fixed;
        /* top: 0;
        left: 0;
        right: 0; */
        /* width: 100%; */
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 25px 0 black;
        z-index: 1;


        
      }

      header * {
        display: inline;
      }

      header li a {
        color: black;
        text-decoration: none;
      }

      header li {
        margin: 20px;
        /* margin-right: 20px; */
        font-size: 20px;
      }
    `,
  ],
})
export class HearderComponent {
  private router = inject(Router);
  private userService = inject(UserService);
  private activatedRoute = inject(ActivatedRoute);
  isSignedIn: boolean = false;

  ngOnInit() {
    if (this.userService.state()._id !== '') this.isSignedIn = true;
  }
  ngDoCheck() {
    if (this.userService.state()._id !== '') this.isSignedIn = true;
  }
  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.isSignedIn = false;
    location.reload();
  }
}
