import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-deleteathletepopup',
  templateUrl: './deleteathletepopup.component.html',
  styleUrls: ['./deleteathletepopup.component.scss']
})
export class DeleteathletepopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteathletepopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  DeleteAthlete(){
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
