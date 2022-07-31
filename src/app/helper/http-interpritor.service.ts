import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpInterpritorService implements HttpInterceptor{
  constructor( private cookieService: CookieService, private router:Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

        const access_token=this.cookieService.get("token");
        if (access_token == 'undefined'){
           this.router.navigate(['authentication']);  
        }else{       
            //if its not login req then send the access_token              
            /* if(!req.url.includes("oauth/token")) */
             {
                 req = req.clone({
                    //  withCredentials: true,
                       setHeaders: { 
                        Authorization: `Bearer ${access_token}`,
                        //'Access-Control-Allow-Origin':'*'
                      }  
                  }); 
                  req = req.clone({
                    //  withCredentials: true,
                       setHeaders: { 
                        'Access-Control-Allow-Origin':'*'
                      }  
                  }); 
              }         
           
            }
      // console.log("interceptor: " + req.url);
    
      
      return next.handle(req);
  }
}
