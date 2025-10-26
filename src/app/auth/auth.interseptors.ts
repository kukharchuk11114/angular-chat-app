import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth-service";
import { Inject, inject } from "@angular/core";
import { catchError, switchMap, throwError } from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    
    const authService: AuthService = inject(AuthService)
    const token = authService.token
    
   if(!token) return next(addToken(req, token!))

    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })

    return next(req)
        .pipe(
            catchError( error => {
                if(error.status === 403){
                    return refreshAndProceed( authService, req, next)
                }
                return throwError(error)
            })
            )
        
}

const refreshAndProceed = (

    authService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    // TODO: Implement refresh token logic
    return authService.refreshAuthToken().pipe(
        switchMap(() => {
            return next(addToken(req, authService.token!))
        })
    )
}

const addToken = (req: HttpRequest<any>, token: string): HttpRequest<any> => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    })
}