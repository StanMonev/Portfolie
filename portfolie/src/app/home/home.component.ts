import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Hello, my name is Stanimir Monev
          </h1>
          <h2 class="subtitle">
            I'm a software engineer with knowladge in Java, C#, PHP, Angular and other.
          </h2>
        </div>
      </div>
    </section>

  `,
  styles: [`
    .title{
      color: white;
    }
    .subtitle{
      color: white;
    }
  `]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
