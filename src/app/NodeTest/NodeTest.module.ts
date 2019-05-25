import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatCheckboxModule, MatChipsModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSortModule, MatStepperModule, MatTableModule, MatTreeModule, MatDatepickerModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { UserComponent } from './UserComponent/user.component';
import { EventComponent } from './EventComponent/event.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { ReportComponent } from './Report/report.component';
import { CalendarModule } from 'app/NodeTest/calendar/calendar.module';

const routes = [
    {
        path     : 'Users/UserComponent',
        component: UserComponent
    },
    {
      path     : 'Events/EventComponent',
      component: EventComponent
  },
  {
    path     : 'Events/Report',
    component: ReportComponent
},
{
    path        : 'calendar',
    loadChildren: './calendar/calendar.module#CalendarModule'
  },
];

@NgModule({
    declarations: [
        UserComponent,
        EventComponent,
        ReportComponent
        
        
    ],
    //    entryComponents: [DeletepopuptestComponent,DeleteathletepopupComponent],
    imports     : [
        RouterModule.forChild(routes),

        TranslateModule,
        FuseSharedModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSortModule,
        MatStepperModule,
        MatTableModule,
        MatTreeModule,
        FuseSharedModule,
              MatRadioModule,
              MatButtonModule,
              MatFormFieldModule,
              MatIconModule,
              MatInputModule,
              MatSelectModule,
              MatStepperModule,
            //  NgxDatatableModule,
              MatCheckboxModule,
              MatPaginatorModule,
              MatSortModule,       
              FuseSharedModule,
              MatTableModule,
              MatDialogModule,
              MatListModule,
              MatAutocompleteModule,
              MatChipsModule,
            //   TreeTableModule,
              MatTreeModule,
            //  CommonModul,
              CdkTableModule,
              MatDatepickerModule,

              OwlDateTimeModule, 
              OwlNativeDateTimeModule,
              CalendarModule



    ],
    exports     : [
        UserComponent,
        EventComponent,
        ReportComponent
    ]
})

export class NodeTestModule
{
}
