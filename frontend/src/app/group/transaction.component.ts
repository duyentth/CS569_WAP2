import { Component, inject } from '@angular/core';
import { GroupStateService, IGroup, ITransaction } from './group-state.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  template: `
    <div class="form">
    <form class="login-form" [formGroup]="formTrans" (ngSubmit)="handleSubmit()">
      <input placeholder="title" formControlName="title"/>
      <input placeholder="description" formControlName="description"/>
      <input placeholder="paidBy" formControlName="paid_by"/>
      <input placeholder="category" formControlName="category"/>
      <input placeholder="amount" formControlName="amount"/>
      <input placeholder="receipt" type="file" formControlName="receipt" accept="image/png, application/pdf" (change)="uploadFile($event)"/>
      <button type="submit" [disabled]="formTrans.invalid">submit</button>
    </form>
    </div>
  `,
  styles: [`
   @import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
  .form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #4CAF50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,.form button:active,.form button:focus {
  background: #43A047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4CAF50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background: #76b852; /* fallback for old browsers */
  background: rgb(141,194,111);
  background: linear-gradient(90deg, rgba(141,194,111,1) 0%, rgba(118,184,82,1) 50%);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
  `
  ]
})
export class TransactionComponent {
  private groupService = inject(GroupStateService);
  private router = inject(Router)
  private activatedRoute = inject(ActivatedRoute)
  receipt !: File;
  trans: ITransaction[] = []; 
  formTrans = inject(FormBuilder).group({
    title:'',
    description:"",
    paid_by: { user_id:'', fullname:'' },
    category:'',
    amount:0,
    date: Date.now(),
    receipt: ''
  })  

  uploadFile(e: Event){
    console.log(e)
    const element_receipt = e.target as HTMLInputElement
    if(element_receipt.files){
      this.receipt = element_receipt.files[0]
    }
  
  
  }
handleSubmit(){
//   const group_id = this.activatedRoute.snapshot.paramMap.get('group_id')

//   if(group_id){
//     const transaction = this.formTrans.value as ITransaction;

//     const formData = new FormData()

//     formData.append('filename', this.formTrans.get('filename')?.value!)
//     formData.append('originalname', this.formTrans.get('originalname')?.value!)
//     formData.append('receipt', this.receipt)

//     const newObj = {...transaction, receipt:{
//       filename: formData.get('filename') as string,
//       originalname: formData.get('originalname') as string
//     }}

    
//     this.groupService.addTransaction(group_id, newObj).subscribe(
//       response => {
//         if (response.success) {
//           this.router.navigate(['', 'detail']);
//         }
//       }
//     );
//   }
 
}
}
