import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { APICallsService } from '../../Service/apiCalls';
import { EventMasterModel } from 'api/apiclient';
import * as _ from 'underscore';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
public filterDateTimeModel: Date;
userList;
userddl;

//For Test Datatable
displayedColumns = ['UserName','Occupide Hours',"Available Hours"];
hours=[9,10,11,12,13,14,15,16,17];
dataSource:MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
eventMasterModel:EventMasterModel;
//For Service Datatable

eventTypeModel;
eventNameModel;
UserModel;
eventList;


  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
    private aPICallsService:APICallsService
  ) { 

      // Configure the layout
      this.fuseConfig.config = {
          layout: {
              navbar   : {
                  hidden: false
              },
              toolbar  : {
                  hidden: false
              },
              footer   : {
                  hidden: false
              },
              sidepanel: {
                  hidden: true
              }
          }
      };
     

  this.dataSource = new MatTableDataSource();
   this.eventMasterModel= new EventMasterModel()

  }

  ngOnInit() {
    this.BindUsersDdl();
    this.filterDateTimeModel=new Date();
  }
 

  getTime(time){
      if(time<9){
          return time+12;
      }
      return time;
  }


 //bind ServiceDatatable
 BindEventGrid(){
   var date=new Date();
   if(this.filterDateTimeModel!=null && this.filterDateTimeModel!=undefined)
   {
    date=this.filterDateTimeModel;
   }
  this.aPICallsService.getUserWeekReport(date.toJSON()).subscribe(x=>{
   var finalEventList=[];
    this.eventList = Object.keys(x).map(function(personNamedIndex){
          let person = x[personNamedIndex];
           return person;
})

var userList=this.userList;
for (let index = 0; index < userList.length; index++) {
  
    var users=_.where(this.eventList, {user_Id:userList[index].id});
    if(users!=null && users!=undefined && users.length>0){
        var nine=false;
        var ten=false;
        var ele=false;
        var tew=false;
        var ther=false;
        var fort=false;
        var fifth=false;
        var sixth=false;
        var seventh=false;
        var totalHr=40;
        var availableHr=40;
        for (let j = 0; j < users.length; j++) {
            var startTime=users[j].startDateTime;
            if(users[j].startDateTime.split(' ')[4]==undefined){
                startTime= users[j].startDateTime.split(' ')[3].split(':')[0];
            }
            else{
                startTime= users[j].startDateTime.split(' ')[4].split(':')[0];
            }
            var endTime=users[j].endDateTime;
            if(users[j].endDateTime.split(' ')[4]==undefined){
                endTime= users[j].endDateTime.split(' ')[3].split(':')[0];
            }
            else{
                endTime= users[j].endDateTime.split(' ')[4].split(':')[0];
            }
            var startTimeIndex=this.hours.indexOf(this.getTime(+(startTime)));
            var endTimeIndex=this.hours.indexOf(this.getTime(+(endTime)));
           
            for(var i=startTimeIndex;i<=endTimeIndex;i++){
                  if(this.hours[i]==9){
                    nine=true;
                    availableHr=availableHr-1;
                  }
                else  if(this.hours[i]==10 && endTimeIndex!=1){
                  ten=true;
                  availableHr=availableHr-1;
                  }
                  else  if(this.hours[i]==11 && endTimeIndex!=2){
                    ele=true;
                    availableHr=availableHr-1;
                  
                  }
                  else if(this.hours[i]==12 && endTimeIndex!=3){
                    tew=true;
                    availableHr=availableHr-1;
                 
                  }
                  else if(this.hours[i]==13 && endTimeIndex!=4){
                    ther=true;
                    availableHr=availableHr-1;
                  }
                  else if(this.hours[i]==14 && endTimeIndex!=5){
                    fort=true;
                    availableHr=availableHr-1;
                  }
                  else if(this.hours[i]==15 && endTimeIndex!=6){
                    fifth=true;
                    availableHr=availableHr-1;
                  }
                  else if(this.hours[i]==16 && endTimeIndex!=7){
                    sixth=true;
                    availableHr=availableHr-1;
                  }
                  else   if(this.hours[i]==17 && endTimeIndex!=8){
                    seventh=true;
                    availableHr=availableHr-1;
                  }
            }
            

        }
        finalEventList.push({"userName":userList[index].username,"Occupied":totalHr-availableHr,"available":availableHr});
        

    }
    else{
        var nine=false;
        var ten=false;
        var ele=false;
        var tew=false;
        var ther=false;
        var fort=false;
        var fifth=false;
        var sixth=false;
        var seventh=false;
        finalEventList.push({"userName":userList[index].username,"Occupied":0,"available":40});
        
    }
    
}   





this.dataSource = new MatTableDataSource(finalEventList);
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
});


}


//Bind System users
BindUsersDdl(){

    this.aPICallsService.getAll().subscribe(x=>{
        this.userList = Object.keys(x).map(function(personNamedIndex){
              let person = x[personNamedIndex];
               return person;
    })

    this.BindEventGrid();
  

})



}
}





