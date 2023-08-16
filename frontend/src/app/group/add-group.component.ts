import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment as env } from 'src/environments/environment';
import { GroupStateService } from './group-state.service';
import { Router } from '@angular/router';
import { IResponse, UserService, initial_state_value } from '../user/user.service';

@Component({
  selector: 'app-add-group',
  template: `
   
   <div class="container">
   <h2>Add New Group</h2>
    <form [formGroup]="addGoupForm" (ngSubmit)="addGroup()" class="my-form">
      <input placeholder="Title" formControlName="title"  class="form-input"/>
      <button type="submit" [disabled]="addGoupForm.invalid" class="form-button">Add Group</button>
    </form>
   </div>
  `,
  styles: [`




.my-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.form-input {
  padding: 10px;
  margin-bottom: 10px;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  padding: 10px 20px;
  background-color: green;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

`],

})
export class AddGroupComponent {
  addGoupForm = inject(FormBuilder).group({
    title: ['', Validators.required],
  });
  private groupService = inject(GroupStateService);
  private router = inject(Router);
  private userService = inject(UserService)

  addGroup() {
    this.groupService
      .addGroup(this.addGoupForm.value as string)
      .subscribe((res) => {
        if (res.success) {
          this.router.navigate(['', 'group', 'list']);
        }
      });
  }

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
  }
}
