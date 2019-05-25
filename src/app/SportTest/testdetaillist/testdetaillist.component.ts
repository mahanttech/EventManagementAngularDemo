import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DeletepopuptestComponent } from '../deletepopuptest/deletepopuptest.component';
import { DeleteathletepopupComponent } from '../deleteathletepopup/deleteathletepopup.component';

@Component({
  selector: 'app-testdetaillist',
  templateUrl: './testdetaillist.component.html',
  styleUrls: ['./testdetaillist.component.scss']
})
export class TestdetaillistComponent implements OnInit {
  NewAthleteform: FormGroup;
  NewAthleteformErrors: any;
  mstServiceModel;
  IsCreateAthlete:boolean=false;

//For Test Datatable
displayedColumns = ['Ranking','Distance','FitnessRating','Deleteathlete'];
dataSource:MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
servicedata;
//For Service Datatable

  constructor( private fuseConfig: FuseConfigService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    ) { 

    this.dataSource = new MatTableDataSource();
    
    // Configure the layout
    this.fuseConfig.config = {
      layout: {
          navbar   : {
              hidden: true
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

  this.NewAthleteformErrors={

    athlete:{},
    Distance:{}

  };
  }

  ngOnInit() {
    this.NewAthleteform=this.formBuilder.group({
      athlete:['',Validators.required],
      Distance:['',Validators.required]
    });

    this.NewAthleteform.valueChanges.subscribe(()=>{
      this.onFormValuesChanged();
    });
  }



  onFormValuesChanged()
  {
      for ( const field in this.NewAthleteformErrors )
      {
          if ( !this.NewAthleteformErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.NewAthleteformErrors[field] = {};

          // Get the control
          const control = this.NewAthleteform.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.NewAthleteformErrors[field] = control.errors;
          }
      }
  }



//bind ServiceDatatable
bindtestdetaillistdatatable(){
   
  //   this.userManagementClient.bindServiceList().subscribe(x=>{
     
  //     this.servicedata = Object.keys(x).map(function(personNamedIndex){
  //           let person = x[personNamedIndex];
  //            return person;
  // })
  // this.dataSource = new MatTableDataSource(this.servicedata);
  // this.dataSource.paginator = this.paginator;
  // this.dataSource.sort = this.sort;
  // });
  
  
  
  
  }
  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  // AddNewAtheletPopup(){
  //   let dialogRef = this.dialog.open(AddnewAthletepopupComponent, {
  //     width: '800px',
  //     panelClass: 'myapp-no-padding-dialog',
  //     // data: { Id:this.groupid,GroupName:this.groupname}
  //     });
    
  //    dialogRef.afterClosed().subscribe(result => {
  //       //console.log('The dialog was closed');
  //       this.bindtestdetaillistdatatable();
  //     });
    
  
  // }
  toggle() {
   
    this.IsCreateAthlete = !this.IsCreateAthlete;
    this.NewAthleteform.reset();
  }

  Clear()
  {
    this.IsCreateAthlete=false;
    this.NewAthleteform.reset();
  }


  AthleteInsert()
  {
   
    // this.userAccountClient.insertService(this.mstServiceModel).subscribe(x=>{
    //     if(x.value==1)
    //     {
         
    //       this.notif.success("Message","Service inserted successfully...",{
    //         timeOut:6000,
    //       });
    //       this.bindservicedatatable(); 
    //       this.Clear();
    //     }
    //     else if(x.value==-2){
    //       this.notif.warn("Message","Record already exists...",{
    //         timeOut:6000,
    //       });
    //       this.bindtestdetaillistdatatable();
    //       this.Clear();
    //     }  
    // });
    //this.Clear();
   // this.bindtestdetaillistdatatable();
  }

  DeleteDialogBoxForAthlete()
{
  let dialogRef = this.dialog.open(DeleteathletepopupComponent, {
    width: 'auto',
    // data: {Id:Id,ServiceName:ServiceName}
  });
 
 dialogRef.afterClosed().subscribe(result => {
    //console.log('The dialog was closed');
    //this.bindservicedatatable();
  });
}

DeleteTest()
{
  let dialogRef = this.dialog.open(DeletepopuptestComponent, {
    width: 'auto',
    // data: {Id:Id,ServiceName:ServiceName}
  });
 
 dialogRef.afterClosed().subscribe(result => {
    //console.log('The dialog was closed');
    //this.bindservicedatatable();
  });
}


}
