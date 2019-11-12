import {Injectable} from '@angular/core';
import {Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(public authService: AuthService, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // Esta logado
        if (this.authService.isLoggedIn) {
            if (state.url == '/login'){
                this.authService.redirectUrl = state.url;
                this.router.navigate(['/dashboard']);
                return false;
            }else{
                //verifica se houve algum bloqueio da rota
                if(this.authService.getCancelRoute){
                    return false;
                } else {
                    return true;
                }
            }
        } // Não esta logado
        else{
            if (state.url != '/login'){
                // Store the attempted URL for redirecting
                this.authService.redirectUrl = state.url;
                // Navigate to the login page
                this.router.navigate(['/login']);
                return false;
            }else{
                return true;
            }

        }
        
    }
}