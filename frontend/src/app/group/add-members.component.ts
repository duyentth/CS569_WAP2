import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  IMember,
  IUser,
  UserService,
  initial_state_value,
} from '../user/user.service';
import { GroupStateService, IInvitees } from './group-state.service';
import { EmailService } from '../email.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-members',
  template: `
    <div class="container">
      <h3>Members in group</h3>
      <table>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
        <tr *ngFor="let su of membersList">
          <td>{{ su.fullname }}</td>
          <td>{{ su.email }}</td>
          <td *ngIf="su.pending">
            <button (click)="onRemove(su.user_id)">Remove</button>
          </td>
        </tr>
      </table>
    </div>
    <p>
      <span (click)="showUnselectedUser()">Click me to invite other user?</span>
    </p>
    <table *ngIf="isShown">
      <th>Name</th>
      <th>Email</th>
      <th>Action</th>
      <tr *ngFor="let u of unselectedUsers">
        <td>{{ u.fullname }}</td>
        <td>{{ u.email }}</td>
        <td><button (click)="onAdd(u.user_id)">Add</button></td>
      </tr>
    </table>
    <div>
      <button class="actBtn" (click)="inviteMembers()">Save</button>
      <button class="actBtn" (click)="onCancel()">Cancel</button>
    </div>
  `,
  styles: [
    `
      .actBtn {
        margin-left: 10px;
        margin-top: 10px;
      }

      span {
        color: blue;
      }
      /* .table-container {
        max-width: 800px;
        margin: 0 auto;
      } */

      table {
        width: 100%;
        border-collapse: collapse;
      }

      th,
      td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #f2f2f2;
      }

      tr:hover {
        background-color: #f5f5f5;
      }
    `,
  ],
})
export class AddMembersComponent {
  @Input() groupId: string = '';
  @Output() isCompleted = new EventEmitter<boolean>();
  usersList: IUser[] = [];
  membersList: IMember[] = [];
  unselectedUsers: IMember[] = [];
  isShown: boolean = false;
  private userService = inject(UserService);
  private groupService = inject(GroupStateService);
  private emailService = inject(EmailService);
  private router = inject(Router);
  constructor() {}

  ngOnInit() {
    this.userService.getUsers().subscribe((res) => {
      this.usersList = res.data;
      this.unselectedUsers = this.usersList.map((user) => ({
        user_id: user._id,
        fullname: user.fullname,
        email: user.email,
        pending: true,
        _id: '',
      }));
    });
    this.groupService.getMembersFromGroup(this.groupId).subscribe((res) => {
      this.membersList = res.data;
    });
  }

  onRemove(userId: string) {
    for (let u of this.membersList) {
      if (u.user_id === userId) {
        this.unselectedUsers.push(u);
        break;
      }
    }
    this.membersList = this.membersList.filter((u) => u.user_id !== userId);
  }
  onAdd(userId: string) {
    for (let u of this.unselectedUsers) {
      if (u.user_id === userId) {
        this.membersList.push({
          user_id: u.user_id,
          fullname: u.fullname,
          email: u.email,
          pending: true,
          _id: '',
        });
        break;
      }
    }
    this.unselectedUsers = this.unselectedUsers.filter(
      (u) => u.user_id !== userId
    );
  }
  inviteMembers() {
    let oldMembersList: IMember[] = [];
    let current: IMember[] = this.membersList;
    this.groupService.getMembersFromGroup(this.groupId).subscribe((res) => {
      oldMembersList = res.data;
      const addedMembers = this.getFromBNotInA(oldMembersList, current);
      const removedMember = this.getFromBNotInA(current, oldMembersList);
      for (let member of addedMembers) {
        if (member.pending) {
          this.groupService
            .addMember(this.groupId, member)
            .subscribe((res) => console.log(res));
        }
      }
      for (let member of removedMember) {
        if (member.pending) {
          this.groupService
            .removeMember(this.groupId, member.user_id)
            .subscribe((res) => console.log(res));
        }
      }
      let emails: string[] = [];
      for (let m of addedMembers) {
        emails.push(m.email);
      }
      const subject =
        'Please signin into your SplitBills app to accept my request';
      const body = "Hey guys. It's time to pay my money back, kakaka!!!";
      this.emailService
        .sendEmails(emails, subject, body)
        .subscribe(console.log);
    });

    this.isCompleted.emit(true);
    this.membersList = [];
    this.unselectedUsers = [];
  }

  onCancel() {
    this.isCompleted.emit(true);
  }

  // getunSelectedUsers(
  //   membersList: Array<IMember>,
  //   unselectedUers: Array<IMember>
  // ) {
  //   const selectedUserIdSet = new Set(membersList.map((u) => u.user_id));
  //   const result = unselectedUers.filter(
  //     (u) => !selectedUserIdSet.has(u.user_id)
  //   );
  //   return result;
  //}
  getFromBNotInA(A: Array<IMember>, B: Array<IMember>) {
    const dictionary = new Set(A.map((u) => u.user_id));
    const result = B.filter((u) => !dictionary.has(u.user_id));
    return result;
  }

  showUnselectedUser() {
    this.isShown = true;
    this.unselectedUsers = this.getFromBNotInA(
      this.membersList,
      this.unselectedUsers
    );
  }
}
