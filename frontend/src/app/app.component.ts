import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="main-container">
      <div class="myheader">
        <app-hearder />
      </div>
      <div class="container">
        <div class="mydata">
          <router-outlet />
        </div>
      </div>
      <div class="myfooter">
        <app-footer />
      </div>
    </div>
  `,

  styles: [
    `
      .main-container {
        max-width: 600px;
        background-image: url('https://cdn.wallpapersafari.com/77/55/FoVknZ.jpg');

        background-size: cover;
        font-family: sans-serif;
        margin-top: 10px;
        /* padding: 20px; */
        text-align: center;
        max-width: 700px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .myheader{

      }
      .myfototer{

      }
      .container {
        /* background-image: url('https://cdn.wallpapersafari.com/77/55/FoVknZ.jpg'); */

       /* background-size: cover;
        font-family: sans-serif;
        margin-top: 10px;
        padding: 20px;
        text-align: center;
        max-width: 600px;
        margin: 0 auto; 
          */
      }
     
      .mydata {
        margin-top: 80px;
        width: 100%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'frontend';
}
