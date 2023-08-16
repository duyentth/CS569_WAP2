import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { IMember, IResponse, IUser } from '../user/user.service';


@Injectable({
  providedIn: 'root',
})
export class GroupStateService {
  private initial_state_value = {
    _id: '',
    title: '',
    members: [],
    transactions: [],
  };
  private http = inject(HttpClient);
  groupState = signal(this.initial_state_value);

  addGroup(data: string) {
    return this.http.post<IResponse>(`${env.SERVER_URL}groups`, data);
  }
  getAllGroups() {
    return this.http.get<IResponse<IGroup[]>>(`${env.SERVER_URL}groups`);
  }
  getMembersFromGroup(groupId: string) {
    return this.http.get<IResponse<IMember[]>>(
      `${env.SERVER_URL}groups/${groupId}/members`
    );
  }
  addMember(groupId: string, member: IMember) {
    return this.http.post<IResponse<boolean>>(
      `${env.SERVER_URL}groups/${groupId}/members`,
      member
    );
  }
  removeMember(groupId: string, member_id: string) {
    return this.http.delete<IResponse<boolean>>(
      `${env.SERVER_URL}groups/${groupId}/members/${member_id}`
    );
  }

  addTransaction(group_id: string, data: FormData) {
    return this.http.post<IResponse>(
      `${env.SERVER_URL}groups/${group_id}/transactions`,
      data
    );
  }

  getAllTransactions(group_id: string) {
    return this.http.get<IResponse<ITransaction[]>>(
      `${env.SERVER_URL}groups/${group_id}/transactions`
    );
  }
  getStatus() {
    return this.http.get<IResponse<IGroup[]>>(
      `${env.SERVER_URL}groups?pending=true`
    );
  }

  updateMemberPendingStatus(group_id: string, user_id: string) {
    return this.http.get<IResponse<Boolean>>(
      `${env.SERVER_URL}groups/${group_id}/members/${user_id}`
    );
  }
  getReceipt(filename: string) {
    return this.http.get(`${env.SERVER_URL}groups/receipt/${filename}`);
  }
}






export interface IGroup {
  _id: string;
  title: string;
  members?: Array<IUser>;
  transactions: Array<ITransaction>;
}
export interface ITransaction {
  title: string,
  description: string,
  paid_by: { user_id: string, fullname: String },
  category: string,
  amount: number,
  date: string,
  receipt : { filename: string; originalname: string }
}

export interface IInvitees {
  user_id: string;
  fullname: string;
  email: string;
}

