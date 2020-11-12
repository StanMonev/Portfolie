import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `

   <!--  <app-header></app-header>
    <app-home></app-home>
    <app-footer></app-footer> -->
    <div class="imageContainer">
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .imageContainer { 
      background-image: url(/assets/images/background.jpg) !important;
      background-size:cover;
      background-position: center center;
    }
    
  `]
})
export class AppComponent {
  title = 'portfolie';
}
