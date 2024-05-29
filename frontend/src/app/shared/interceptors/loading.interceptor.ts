import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading/loading.service';
import { tap } from 'rxjs';

var pendingRequests = 0;
let loadingService!:LoadingService;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  loadingService = inject(LoadingService);
  
  loadingService.showLoading();
  pendingRequests++;
  return next(req).pipe(
    tap({
      next: (event) => {
        if(event.type===HttpEventType.Response){
          handleHideLoading();
        }
      },
      error: (_) => {
        handleHideLoading();
      }
    })
  );

};

function handleHideLoading (){
  pendingRequests--;
  if(pendingRequests===0){
    loadingService.hideLoading();
  }
}



