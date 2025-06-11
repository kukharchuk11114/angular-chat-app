import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth-service";
import { Inject, inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    
    const authService: AuthService = inject(AuthService)
    const token = authService.token
    
   if(!token) return next(req)

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
    return next(req);
}

