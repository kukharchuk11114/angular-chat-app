import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideBarComponent } from "../side-bar/side-bar.component";
import { ProfileService } from '../../data/services/profiles.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SideBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
    profileService = inject(ProfileService)
    ngOnInit(){
      console.log('ng0Init')
      this.profileService.getMe().subscribe(val => {
        console.log(val)
      })
    }
    
}
