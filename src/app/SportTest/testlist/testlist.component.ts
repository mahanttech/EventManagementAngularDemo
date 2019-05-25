import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-testlist',
  templateUrl: './testlist.component.html',
  styleUrls: ['./testlist.component.scss']
})
export class TestlistComponent implements OnInit {

  NewTestform: FormGroup;
  NewTestformErrors: any;
  mstServiceModel;
  IsCreateService:boolean=false;


  TestType= [  { id: 1,type: 'Coopertest'},
  { id: 2,type: '100 meter sprint:'}
];

//For Test Datatable
displayedColumns = ['Date','NumberOfparticipants','TetsType'];
dataSource:MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
servicedata;
//For Service Datatable




  constructor(
    private fuseConfig: FuseConfigService,
    private formBuilder: FormBuilder,
  ) { 

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
     

  this.dataSource = new MatTableDataSource();
  // Service From Errors
  this.NewTestformErrors={

    TestType:{},
    Date:{}

  };


  }

  ngOnInit() {
    this.NewTestform=this.formBuilder.group({
      TestType:['',Validators.required],
       Date:['',Validators.required]
    });

    this.NewTestform.valueChanges.subscribe(()=>{
      this.onFormValuesChanged();
    });


  }
  onFormValuesChanged()
  {
      for ( const field in this.NewTestformErrors )
      {
          if ( !this.NewTestformErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.NewTestformErrors[field] = {};

          // Get the control
          const control = this.NewTestform.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.NewTestformErrors[field] = control.errors;
          }
      }
  }

  toggle() {
   
    this.IsCreateService = !this.IsCreateService;
    this.NewTestform.reset();
  }

  Clear()
  {
    this.IsCreateService=false;
    this.NewTestform.reset();
  }

  TestInsert()
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
    //       this.bindtestlistdatatable();
    //       this.Clear();
    //     }  
    // });
    //this.Clear();
   // this.bindtestlistdatatable();
  }



 //bind ServiceDatatable
 bindtestlistdatatable(){
   
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




}
