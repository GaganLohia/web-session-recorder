import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WebSessionRecorder } from '../index';

@Injectable()
export class WebSessionRecorderAngularInterceptor implements HttpInterceptor {
  constructor(private webSessionRecorder: WebSessionRecorder) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event.constructor.name == 'HttpResponse') {
          this.webSessionRecorder.captureNetworkActivity(
            this.getRequestData(request),
            this.getResponseData(event as HttpResponse<any>)
          );
        }
      }));
  }

  private getRequestData(request: HttpRequest<any>) {
    return {
      url: request.url,
      method: request.method,
      headers: request.headers.keys().reduce((acc: any, key) => {
        acc[key] = request.headers.get(key);
        return acc;
      }, {}),
      body: request.body
    };
  }

  private getResponseData(event: HttpResponse<any>) {
    return {
      status: event.status,
      statusText: event.statusText,
      headers: Object.fromEntries(event.headers.keys().map(key => [key, event.headers.get(key)])) as Record<string, string>,
      body: event.body
    };
  }
}