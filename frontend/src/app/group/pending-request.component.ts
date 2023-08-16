import { Component, inject } from '@angular/core';
import { GroupStateService, IGroup } from './group-state.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, initial_state_value } from '../user/user.service';

@Component({
  selector: 'app-pending-request',
  template: `
 
 
<div class="container">
<div *ngFor="let group of groups" class="group-card">
  <h3 class="group-title">{{ group.title }}</h3>
  <button class="accept-button" (click)="acceptInvitation(group._id)">accept</button>
</div>

<ng-container *ngIf="groups.length === 0; else message">
  <p>No invitations available.</p>
</ng-container>

<ng-template #message>
  <p>Please click Accept button to join us</p>
</ng-template>

</div>
  `,
  styles: [`
  .group-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.group-title {
  font-size: 20px;
  margin-bottom: 5px;
}

.accept-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}

.accept-button:hover {
  background-color: #45a049;
}

p{
  font-size:48px;
  color: blue;
}


  `
  ]
})
export class PendingRequestComponent {
  private groupeService = inject(GroupStateService)
  private activatedRoute = inject(ActivatedRoute)
  private userService = inject(UserService);
  private router = inject(Router);

  group_id = this.activatedRoute.snapshot.paramMap.get('group_id')
  groups : IGroup []=[]

  ngOnInit() {
    this.getPendingGroups();
  }

  getPendingGroups(){
    this.groupeService.getStatus().subscribe(response =>{
      if(response.success){
        this.groups = response.data
        console.log(response.data)
      }
   
    })
  }

  acceptInvitation(groupId:string){
    const index = this.groups.findIndex((group) => group._id === groupId);
    if (index !== -1) {
      this.groups.splice(index, 1);
     // console.log(this.userService.state()._id)
      this.updatePendingStatus(groupId, this.userService.state()._id)
      this.router.navigate(['', 'group', 'list'])
    }

  }

  updatePendingStatus(groupId: string, user_id: string) {
    this.groupeService.updateMemberPendingStatus(groupId, user_id).subscribe((response) => {
      if (response.success) {
        console.log('Pending status updated successfully' );
      }
    });
  }

  logout() {
    localStorage.clear();
    this.userService.state.set(initial_state_value);
    this.router.navigate(['']);
  }
}
