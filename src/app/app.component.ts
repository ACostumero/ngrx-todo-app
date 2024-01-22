import { Component, OnDestroy, inject } from '@angular/core';
import { StorageService } from '@app-core/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy{
  title = 'ngrx-todo-app';

  private readonly  _storageService: StorageService = inject(StorageService);

  ngOnDestroy(): void {
    this._storageService.reset();
  }

}
