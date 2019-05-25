import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { APICallsService } from '../../Service/apiCalls';
import { EventMasterModel } from 'api/apiclient';
import * as _ from 'underscore';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventForm: FormGroup;
  eventFormErrors: any;
  IsEventForm:boolean=false;
  public startDateTimeModel: Date;
  public endDateTimeModel: Date;
  public filterDateTimeModel: Date;
  userList;
  message:string="";

  eventType= [ 'task'
  , 'meeting' 
];
userddl;

//For Test Datatable
// displayedColumns = ['userName','09-10','10-11','11-12','12-01','01-02','02-03','03-04','04-05'];
displayedColumns = ['userName','nine','ten','ele','twel','one','two','three','four'];
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
  // Service From Errors
  this.eventFormErrors={

    eventType:{},
    eventName:{},
    startDateTime:{},
    endDateTime:{},
    userId:{}

  };
   this.eventMasterModel= new EventMasterModel()

  }

  ngOnInit() {
    this.BindUsersDdl();
    this.eventForm=this.formBuilder.group({
      eventType:['',Validators.required],
       eventName:['',Validators.required],
       startDateTime:['',Validators.required],
       endDateTime:['',Validators.required],
       userId:['',Validators.required]
    });

    this.eventForm.valueChanges.subscribe(()=>{
      this.onFormValuesChanged();
    });
    this.filterDateTimeModel=new Date();
  //  this.BindEventGrid();


  }
  onFormValuesChanged()
  {
      for ( const field in this.eventFormErrors )
      {
          if ( !this.eventFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.eventFormErrors[field] = {};

          // Get the control
          const control = this.eventForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.eventFormErrors[field] = control.errors;
          }
      }
  }

  toggle() {
   
    this.IsEventForm = !this.IsEventForm;
    this.eventForm.reset();
  }

  Clear()
  {
    this.IsEventForm=false;
    this.eventForm.reset();
  }

  InsertUpdateEvent()
  {


   var startDate=new Date(this.startDateTimeModel.toString());
   var endDate=new Date(this.endDateTimeModel.toString());
   var startHour=startDate.getHours();
   var endHour=endDate.getHours();
   var startDay=startDate.getDay();
   var endDay=endDate.getDay();


   if(startHour>=9 && endHour<=17 && startDay<6 && endDay<6){
   this.eventMasterModel.name=this.eventNameModel;
   this.eventMasterModel.event_Type=this.eventTypeModel;
   this.eventMasterModel.startDateTime=startDate.toJSON();
   this.eventMasterModel.endDateTime=endDate.toJSON();
   this.eventMasterModel.user_Id=this.UserModel.id;
    this.aPICallsService.insertUpdateEvent(this.eventMasterModel).subscribe(x=>{
        if(x==1)
        {
          this.BindUsersDdl(); 
          this.Clear();
          this.message="";
        }
        else if(x==-11){
        this.message="User is occupied for the selected time period.";
         this.BindUsersDdl();
         // this.Clear();
        }  
    });
  
}
else{

    this.message="Please provide Week days only and hours between 9:00 Am to 5:00 Pm";
}
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
  this.aPICallsService.getEventList(date.toJSON()).subscribe(x=>{
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
                  }
                else  if(this.hours[i]==10 && endTimeIndex!=1){
                  ten=true;
                  }
                  else  if(this.hours[i]==11 && endTimeIndex!=2){
                    ele=true;
                  
                  }
                  else if(this.hours[i]==12 && endTimeIndex!=3){
                    tew=true;
                 
                  }
                  else if(this.hours[i]==13 && endTimeIndex!=4){
                    ther=true;
                    
                  }
                  else if(this.hours[i]==14 && endTimeIndex!=5){
                    fort=true;
                    
                  }
                  else if(this.hours[i]==15 && endTimeIndex!=6){
                    fifth=true;
                    
                  }
                  else if(this.hours[i]==16 && endTimeIndex!=7){
                    sixth=true;

                  }
                  else   if(this.hours[i]==17 && endTimeIndex!=8){
                    seventh=true;
                  }
            }
            

        }
        finalEventList.push({"eventType":"","userName":userList[index].username,"nine":nine,"ten":ten,"ele":ele,"twel":tew,"one":ther,"two":fort,"three":fifth,"four":sixth});
        

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
        finalEventList.push({"eventType":"","userName":userList[index].username,"nine":nine,"ten":ten,"ele":ele,"twel":tew,"one":ther,"two":fort,"three":fifth,"four":sixth});
        
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





