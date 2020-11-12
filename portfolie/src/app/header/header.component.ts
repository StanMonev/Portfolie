import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
      <div class="navbar is-fixed-top">
        <div class="navbar-brand has-text-centered">
          <a class="navbar-item">
            <img src="/assets/images/logo.png" width="40px" alt="Logo">
          </a>
          <a routerLink="/home" class="navbar-item">Home</a>
          <a routerLink="/about" class="navbar-item">About</a>
          <a routerLink="/contact" class="navbar-item" style="margin: 0 5px 0 0;">Contact</a>
        </div>
      </div>
  `,
  styles: [`
    /* .navbar{
      background-color: transparent;
    } */

    /* a{
      text-align: center;
      color: white;
    } */

    .navbar{
      background-color: transparent;
      width: 100%;
      display: block;
      text-align: center;
    }

    .navbar-brand{
      border-radius: 0 0 15px 15px;
      box-shadow: 3px 3px 15px black;/* 3px 3px 15px black; */
      margin: auto;
      background-color: silver;
      text-align: center;
      width: fit-content;
    }

/*     .navbar .navbar-brand {
      text-align: center;
      display: block;
      width: 100%;
    } */

    /* .navbar .navbar-brand > .navbar-item,
    .navbar .navbar-brand .navbar-link {
      display: inline-block;
    } */
  `]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
