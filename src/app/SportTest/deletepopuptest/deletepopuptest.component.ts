import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deletepopuptest',
  templateUrl: './deletepopuptest.component.html',
  styleUrls: ['./deletepopuptest.component.scss']
})
export class DeletepopuptestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletepopuptestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  DeleteTest(){
    debugger;
       // this.userManagementClient.deleteService(id).subscribe(x=>{
       // if(x.value==1){
       // this.notif.success("Success","Record deleted successfully",{
       //   timeOut:6000,
       // });
       // this.dialogRef.close();
       // }
       // else if(x.value==-2)
       // {
       // this.notif.warn("Warning","service can note be deleted",{
       //   timeOut:6000,
       // });
       // this.dialogRef.close();
       // }
       // else if(x.value==-1)
       // {
       // this.dialogRef.close();
       // this.notif.error("Error","something went wrong",{
       //   timeOut:6000,
       // })
       // }
       // });
        }

}
