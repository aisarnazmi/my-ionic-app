import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class IndexGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      this.storageService.get('isAuthenticate').then(response => {
        if (response) {
          // if isAuthenticate == true
          this.router.navigate(['/dashboard']);
          resolve(false);
        } else {
          // if isAuthenticate == false
          resolve(true);
        }
      }).catch(error => {
        resolve(true);
      });
    })
  }
  
}
