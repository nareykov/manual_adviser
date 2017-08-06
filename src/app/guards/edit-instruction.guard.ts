import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {ManualService} from '../Services/manual.service';
import {Manual} from '../Models/manual';

@Injectable()
export class EditInstructionGuard implements CanActivate {

  manual: Manual;

  constructor (private manualService: ManualService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.manualService.getManual(next.params['manualId']).subscribe((data) => this.manual = data);
    return localStorage.getItem('userRole') === 'ROLE_ADMIN' || this.manual.userId === +localStorage.getItem('userId');
  }
}
