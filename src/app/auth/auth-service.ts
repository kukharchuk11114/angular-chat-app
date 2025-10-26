import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, tap, throwError } from "rxjs";
import { TokenResponse } from "./auth.interface";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    http :HttpClient = inject(HttpClient)

    cookieService = inject(CookieService);
    router = inject(Router);

    baseApiUrl :string = 'https://icherniakov.ru/yt-course/auth/'

    token: string | null = null
    refreshToken: string | null = null


    get isAuth(){
        if(!this.token){
            this.token = this.cookieService.get('token')
        }
        return !!this.token
    }   

    login(payload:{username:string, password:string}){
        const fd = new FormData()
        fd.append('username', payload.username)
        fd.append('password', payload.password)

        console.log('Відправляємо дані:', {
            username: payload.username,
            password: payload.password
        })

        return this.http.post<TokenResponse>(
            `${this.baseApiUrl}token`,
            fd,
            ).pipe(
                tap(val => this.saveTokens(val))
            )
    }

    logout() {
        this.token = null;
        this.refreshToken = null;
        this.cookieService.delete('token');
        this.cookieService.delete('refreshToken');
        this.router.navigate(['/login'])
    }

    saveTokens(res: TokenResponse) {
        this.token = res.access_token
        this.refreshToken = res.refresh_token

        this.cookieService.set('token', this.token)
        this.cookieService.set('refreshToken', this.refreshToken)
}

    refreshAuthToken(){
         return this.http.post<TokenResponse>(
            `${this.baseApiUrl}token`,
            { refresh_token: this.refreshToken }
        ).pipe(
            tap(val => this.saveTokens(val)),
            catchError(err => {
                this.logout()
                return throwError(() => err)
            })
        )
    } 
}
