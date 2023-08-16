import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <section id="section-a">
        <p>The secret to managing your money is to know where it's going.</p>
      </section>
      <section id="section-b">
        <p>Copy-right@2023 Jean & Duyen</p>
      </section>
    </footer>
  `,
  styles: [
    `
      .footer {
        /* position: fixed; */
        left: 0;
        bottom: 0;
        width: 100%;
        /* padding: 10px; */
        text-align: center;
        background: #cbecf2;
      }
      #section-a {
        padding: 1px;
        text-align: center;
      }
      #section-b {
        padding: 1px;
        text-align: center;
      }
      p {
        font-size: 15px;
        font-weight: 20px;
        font-family: 'Chamberi Super Display', sans-serif;
      }
    `,
  ],
})
export class FooterComponent {}
