import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ProfileCardComponent} from './common-ui/profile-card/profile-card.component'
import { ProfileService } from './data/services/profiles.service';
import { JsonPipe } from '@angular/common';
import { Profile } from './data/interfaces/profile.interface';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})

export class AppComponent {
  profileService = inject(ProfileService)
  profiles: Profile[] = []
  

  constructor() {
    this.profileService.getTestAccounts().subscribe(
      val => {
        console.log('Полученные данные:', val);
        this.profiles = val;
      },
      err => {
        console.error('Ошибка загрузки данных:', err);
      }
    );
  }
  
}
