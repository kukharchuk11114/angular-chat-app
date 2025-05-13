import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { AuthService } from "./auth-service";
import { Inject, inject } from "@angular/core";
import { catchError, throwError } from "rxjs";

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

   const token = inject(AuthService).token

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
                    return refreshAndProceed( AuthService, req, next)
                }
                return throwError(error)
            })
            )
        )

}
const refreshAndProceed = (

    AuthService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
    
) =>{return}

