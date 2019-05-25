import { Component, OnInit, ViewChild } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { APICallsService } from '../../Service/apiCalls';
import { SystemUsersModel } from 'api/apiclient';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  userFormErrors: any;
  IsUserForm:boolean=false;
  userRole= ['Resource Manager'
  ,'Normal User'
];


displayedColumns = ['UserName','Role','Action'];
dataSource:MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
systemUsersModel:SystemUsersModel;



//Models
UserNameModel;
passwordModel;
roleModel;
editid;

userList;





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
  this.userFormErrors={

    userName:{},
    password:{},
    role:{},

  };
  this.systemUsersModel=new SystemUsersModel();

  }

  ngOnInit() {
    this.BindUserGrid();
    this.userForm=this.formBuilder.group({
      role:['',Validators.required],
       userName:['',Validators.required],
       password:['',Validators.required]
    });

    this.userForm.valueChanges.subscribe(()=>{
      this.onFormValuesChanged();
    });


  }
  onFormValuesChanged()
  {
      for ( const field in this.userFormErrors )
      {
          if ( !this.userFormErrors.hasOwnProperty(field) )
          {
              continue;
          }

          // Clear previous errors
          this.userFormErrors[field] = {};

          // Get the control
          const control = this.userForm.get(field);

          if ( control && control.dirty && !control.valid )
          {
              this.userFormErrors[field] = control.errors;
          }
      }
  }

  toggle() {
   
    this.IsUserForm = !this.IsUserForm;
    this.userForm.reset();
  }

  Clear()
  {
    this.IsUserForm=false;
    this.editid="";
    this.userForm.reset();
  }

  InsertUpdateUser()
  {
   this.systemUsersModel.username=this.UserNameModel;
   this.systemUsersModel.password=this.passwordModel;
   this.systemUsersModel.role=this.roleModel;
   this.systemUsersModel.id=this.editid;

    if(this.editid=="" && this.editid == null && this.editid==undefined){
        this.aPICallsService.register(this.systemUsersModel).subscribe(x=>{
            if(x==1)
            {
             
              this.Clear();
            }
            else if(x==-2){
              this.BindUserGrid();
              this.Clear();
            }  
        });

    }
    else{
        this.aPICallsService.update(this.editid,this.systemUsersModel).subscribe(x=>{
            if(x==1)
            {
                this.BindUserGrid();
              this.Clear();
            }
            else if(x==-2){
          
              this.Clear();
            }  
        });
    }


    
  }



 //bind ServiceDatatable
 BindUserGrid(){
  this.aPICallsService.getAll().subscribe(x=>{
    this.userList = Object.keys(x).map(function(personNamedIndex){
          let person = x[personNamedIndex];
           return person;
})
this.dataSource = new MatTableDataSource(this.userList);
this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;
});
}


EditUser(row){
    this.IsUserForm=true;
    this.UserNameModel=row.username;
    this.roleModel=row.role;
    this.editid=row.id;
  
}





}
