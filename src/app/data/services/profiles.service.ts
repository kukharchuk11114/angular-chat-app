import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Profile } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  http = inject(HttpClient)

  

  constructor(){}

  getTestAccounts() {
    return this.http.get<Profile[]>('https://icherniakov.ru/yt-course/account/test_accounts');
  }

  getMe(){
    return this.http.get<Profile[]>('https://icherniakov.ru/yt-course/account/me');
  }
}
