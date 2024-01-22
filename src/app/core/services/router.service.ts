// Core
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '@app-core/constants/routes.const';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  private readonly _router: Router = inject(Router);

  public goToMainPage() {
    this._router.navigate(['/']);
  }

  public goToTaskDetail(id: string) {
    this._router.navigate([APP_ROUTES.TASK_DETAIL, id]);
  }

}
