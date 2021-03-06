﻿/* tslint:disable */
/* eslint-disable */
//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v12.2.5.0 (NJsonSchema v9.13.37.0 (Newtonsoft.Json v11.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------
// ReSharper disable InconsistentNaming

import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');

export class BaseClient {
  //private oAuthService: OAuthService;
  //private errorService: ErrorService;
  private router: Router

  constructor() {
    //this.oAuthService = Globals.injector.get(OAuthService);
    //this.errorService = Globals.injector.get(ErrorService);
    //this.router = Globals.injector.get(Router);
  }

  protected transformOptions(options: any) {
    const timestamp = new Date();
    options.headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      //'Authorization': this.oAuthService.authorizationHeader(),
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'X-Proact-Timezone-Offset-Mins': (timestamp.getTimezoneOffset() * -1).toString()
    });
    return Promise.resolve(options);
  }

  protected transformResult(url: string, response: HttpResponse<Blob>, processor: (response: HttpResponse<Blob>) => any): Observable<any> {
    try {
     
      if (!response.ok) {
        if (response.status >= 500) {
          try {
            let error = response.body as any;

            if (!environment.production && error && error.message) { 
        //      this.errorService.raiseError(error);
            } else {
              this.router.navigate(['/error/internal-server']);
            }
          } catch (e) {
            this.router.navigate(['/error/internal-server']);
          }
        }
        else {
          switch (response.status) {
            case 403:
              this.router.navigate(['/error/access-denied']);
              break;
            case 401:
              this.router.navigate(['/error/token']);
              break;
            case 409:
              break;
          }
        }
      }
      return processor(response);
    }
    catch (e) {
      //this.errorService.raiseError(e);
    }
  }
}


@Injectable()
export class EventMasterModel implements IEventMasterModel {
    id?: string | undefined;
    event_Type?: string | undefined;
    name?: string | undefined;
    startDateTime?: string | undefined;
    endDateTime?: string | undefined;
    user_Id?: string | undefined;

    constructor(data?: IEventMasterModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.event_Type = data["event_Type"];
            this.name = data["name"];
            this.startDateTime = data["startDateTime"];
            this.endDateTime = data["endDateTime"];
            this.user_Id = data["user_Id"];
        }
    }

    static fromJS(data: any): EventMasterModel {
        data = typeof data === 'object' ? data : {};
        let result = new EventMasterModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["event_Type"] = this.event_Type;
        data["name"] = this.name;
        data["startDateTime"] = this.startDateTime;
        data["endDateTime"] = this.endDateTime;
        data["user_Id"] = this.user_Id;
        return data; 
    }
}

export interface IEventMasterModel {
    id?: string | undefined;
    event_Type?: string | undefined;
    name?: string | undefined;
    startDateTime?: string | undefined;
    endDateTime?: string | undefined;
    user_Id?: string | undefined;
}

export class SystemUsersModel implements ISystemUsersModel {
    id?: string | undefined;
    role?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    token?: string | undefined;
    message?: string | undefined;

    constructor(data?: ISystemUsersModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.role = data["role"];
            this.username = data["username"];
            this.password = data["password"];
            this.token = data["token"];
            this.message = data["message"];
        }
    }

    static fromJS(data: any): SystemUsersModel {
        data = typeof data === 'object' ? data : {};
        let result = new SystemUsersModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["role"] = this.role;
        data["username"] = this.username;
        data["password"] = this.password;
        data["token"] = this.token;
        data["message"] = this.message;
        return data; 
    }
}

export interface ISystemUsersModel {
    id?: string | undefined;
    role?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    token?: string | undefined;
    message?: string | undefined;
}



/* tslint:disable */
////
//