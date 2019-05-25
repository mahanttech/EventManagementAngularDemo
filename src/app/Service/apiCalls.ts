import { Injectable } from '@angular/core';
import { TokenParams } from './token-params';
import { SystemUsersModel, EventMasterModel} from 'api/apiclient';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import 'rxjs/add/operator/map';


@Injectable()

export class APICallsService{
headers;    
userUrl:string="http://localhost:49360/api/users/";
eventUrl:string="http://localhost:49360/api/EventMaster/";
    constructor(
        private  http:HttpClient,
    ) {
       
        let tokenKey=this.GetValueFromLocalStorage().token;
         this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+tokenKey
        })
      }



      

public AuthenticateUser(systemUsersModel:SystemUsersModel):Observable<any>{
    let options = { headers: this.headers };
    return this.http.post(this.userUrl+"Authenticate",systemUsersModel,options)
    .map((result:Response)=>result);
}

getById(id:string): Observable<any> {
    let url_ = this.userUrl + "GetById/"+id;
    return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
}

getAll(): Observable<any> {
    let url_ = "http://localhost:49360/api/users";
    return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
}

register(systemUsersModel: SystemUsersModel): Observable<any> {
    let url_ = this.userUrl + "register";
    url_ = url_.replace(/[?&]$/, "");
    const content_ = JSON.stringify(systemUsersModel);
    let options = { headers: this.headers };
    return this.http.post(url_,systemUsersModel,options)
    .map((result:Response)=>result);

    };

update(id:number,systemUsersModel: SystemUsersModel): Observable<any> {
        let url_ = this.userUrl +id;
        url_ = url_.replace(/[?&]$/, "");
        const content_ = JSON.stringify(systemUsersModel);
        let options = { headers: this.headers };
        return this.http.put(url_,systemUsersModel,options)
        .map((result:Response)=>result);
    
        };
    
 
insertUpdateEvent(eventMasterModel: EventMasterModel): Observable<any> {
    debugger;
           let url_ = this.eventUrl + "AddUpdateEvent";
            url_ = url_.replace(/[?&]$/, "");
            const content_ = JSON.stringify(eventMasterModel);
            let options = { headers: this.headers };
            return this.http.post(url_,eventMasterModel,options)
            .map((result:Response)=>result);
        
            };
        
getEventList(date): Observable<any> {
                let url_ = this.eventUrl+"EventList"+"?date="+date;
                return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
            }

getAllEvents(): Observable<any> {
    let url_ = this.eventUrl+"GetAllEvents";
    return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
}

getUserWeekReport(date): Observable<any> {
    let url_ = this.eventUrl+"?date="+date;
    return this.http.get(url_,{headers:this.headers}).map((result:Response)=>result);
}

public GetValueFromLocalStorage():SystemUsersModel{
    let tokendata=JSON.parse(localStorage.getItem("Authorization"));
    return tokendata==null? null:tokendata;
}


}