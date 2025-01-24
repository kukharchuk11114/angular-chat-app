import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    http :HttpClient = inject(HttpClient)

    baseApiUrl :string = 'https://icherniakov.ru/yt-course/account/test_accounts'

login(payload:{username:string, passwaord:string}){
    return this.http.post(
        `${this.baseApiUrl}token`,
        payload,
    )
}
}