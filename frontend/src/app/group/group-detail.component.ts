import {
  Component,
  ElementRef,
  inject,
  Pipe,
  PipeTransform,
  ViewChild,
} from '@angular/core';
import { GroupStateService, IGroup, ITransaction } from './group-state.service';
import { Router, ActivatedRoute } from '@angular/router';
import { initial_state_value, UserService } from '../user/user.service';
// import { jqxScrollViewComponent } from 'jqwidgets-ng/jqxscrollview';

@Component({
  selector: 'app-group-detail',
  template: `
    <div>
      <main>
        <input
          type="text"
          name="search"
          placeholder="Search transaction"
          #myInput
          (input)="filterTransactions()"
          class="search-input"
        />

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Paid_by</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let trans of filteredTransactions">
              <td>{{ trans.title }}</td>
              <td>{{ trans.description }}</td>
              <td>{{ trans.category }}</td>
              <td>{{ trans.amount | currency }}</td>
              <td>{{ trans.date | date }}</td>
              <td>{{ trans.paid_by.fullname }}</td>

              <td>
                <img
                  src="http://localhost:3000/uploads/{{
                    trans.receipt.filename
                  }}"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  `,
  styles: [
    `
      img {
        width: 120px;
      }
      ,
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
      .search-input {
        padding: 10px;
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 20px;
        width: 70%;
      }
    `,
  ],
})
export class GroupDetailComponent {
  @ViewChild('myInput', { static: false }) myInput!: ElementRef;

  private groupService = inject(GroupStateService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private userService = inject(UserService);
  searchText: string = '';

  transactions: ITransaction[] = [];

  filteredTransactions: ITransaction[] = [];

  group_id = this.activatedRoute.snapshot.paramMap.get('group_id');

  constructor() {
    if (this.group_id) {
      this.groupService
        .getAllTransactions(this.group_id)
        .subscribe((response) => {
          if (response.success) {
            this.transactions = response.data;
            this.filteredTransactions = this.transactions;
          }
        });
    }
  }

  filterTransactions() {
    let searchText = this.myInput.nativeElement.value.toLowerCase();
    if (!searchText) {
      this.filteredTransactions = this.transactions;
      return;
    }

    this.filteredTransactions = this.filteredTransactions.filter(
      (trans) =>
        trans.title.toLowerCase().includes(searchText) ||
        trans.paid_by.fullname.toLowerCase().includes(searchText) ||
        trans.category.toLowerCase().includes(searchText) ||
        trans.date.toString().toLowerCase().includes(searchText)
    );
  }

  // logout() {
  //   localStorage.clear();
  //   this.userService.state.set(initial_state_value);
  //   this.router.navigate(['']);
  // }
}
