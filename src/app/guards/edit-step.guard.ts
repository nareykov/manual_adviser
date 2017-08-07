import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {StepService} from '../Services/step.service';

@Injectable()
export class EditStepGuard implements CanActivate {
  userId: number;

  constructor(private stepService: StepService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.stepService.getUserIdByStepId(next.params['stepId']).subscribe((data) => this.userId = data);
    return  localStorage.getItem('userRole') === 'ROLE_ADMIN' || this.userId === +localStorage.getItem('userId');
  }
}
