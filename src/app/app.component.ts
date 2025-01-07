import { Component,  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from './common-ui/profile-card/profile-card.component'
import { ImgUrlPipe } from './helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCardComponent, ImgUrlPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})

export class AppComponent {

  
}
