import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { GroupStateService, IGroup } from './group-state.service';
import { Router } from '@angular/router';
import { UserService, initial_state_value } from '../user/user.service';

@Component({
  selector: 'app-group-list',
  template: `
    <div class="container">
      <h3>Group List</h3>
      <div *ngIf="showMember">
        <app-add-members
          [groupId]="selectedGroupId"
          (isCompleted)="receiveStatusAddingMember($event)"
        />
      </div>
      <div>
        <table>
          <th>Title</th>
          <th>Action</th>
          <tr *ngFor="let g of groupsList">
            <td>{{ g.title }}</td>
            <td>
              <button (click)="showAddMember(g._id)" [disabled]="showMember">
                Add Members
              </button>
              <button
                (click)="gotoAddTransaction(g._id)"
                [disabled]="showMember"
              >
                Add Transactions
              </button>
              <button (click)="gotoDetails(g._id)" [disabled]="showMember">
                Details
              </button>
              <button (click)="gotoReport(g._id)" [disabled]="showMember">
                Report
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
      input[type='text'] {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        height: 20px;
        border-radius: 4px;
        border: 1px solid #ccc;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th,
      td {
        padding: 8px;
        text-align: left;
        color: blue;
        font-size: 26px;
      }

      th {
        background-color: #f2f2f2;
      }

      tr:nth-child(even) {
        background-color: #f9f9f9;
      }

      button {
        margin-left: 10px;
        font-size: 16px;
      }
      ,
      td {
        text-align: right;
      }
    `,
  ],
})
export class GroupListComponent {
  groupService = inject(GroupStateService);
  groupsList: IGroup[] = [];
  showMember: boolean = false;
  selectedGroupId: string = '';
  private router = inject(Router);
  private userService = inject(UserService);

  searchText: string = '';

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
  }
  constructor() {
    this.groupService
      .getAllGroups()
      .subscribe((res) => (this.groupsList = res.data));
  }
  ngOnInit() {
    this.groupService
      .getAllGroups()
      .subscribe((res) => (this.groupsList = res.data));
    this.showMember = false;
  }

  showAddMember(groupId: string) {
    this.showMember = true;
    this.selectedGroupId = groupId;
  }
  gotoAddTransaction(group_id: string) {
    this.router.navigate(['', 'group', group_id, 'transactions', 'add']);
  }
  gotoDetails(group_id: string) {
    this.router.navigate(['', 'group', group_id, 'detail']);
  }
  receiveStatusAddingMember(status: boolean) {
    if (status) {
      this.showMember = false;
    }
  }
  gotoReport(groupId: string) {
    this.router.navigate(['', 'group', groupId, 'report']);
  }
}
