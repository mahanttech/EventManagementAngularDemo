import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { APICallsService } from '../Service/apiCalls';
import { SystemUsersModel } from 'api/apiclient';
import { LocalStorageService } from '../Service/localStorageService';
import { Route, Router } from '@angular/router';
// import { TokenParams } from '../../../../../../app/Auth/token-params';//05/16/2018
// import { AuthService } from '../../../../../../app/Auth/auth.service';//05/16/2018
// import { LocalStorageService } from '../../../../../../app/Auth/localStorageService';//05/16/2018
// import { Router, ActivatedRoute } from '@angular/router';//05/16/2018
// import { UserAccountClient, MstOTPModel } from '../../../../../../api/apiclient'
// import { ToastrService } from 'ngx-toastr';


// import { SimpleNotificationsModule } from 'angular2-notifications';
// import { NotificationsService } from 'angular2-notifications';

@Component({
    selector: 'fuse-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: fuseAnimations,
            
    
})
export class FuseLoginComponent implements OnInit {
    loginForm: FormGroup;
    loginFormErrors: any;
    systemUsersModel:SystemUsersModel;
    
    _mstOTPModel;
    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private aPICallsService:APICallsService,
        private localStorageService:LocalStorageService,
        private router: Router
    ) {
        {
            // Configure the layout
            this.fuseConfig.config = {
                layout: {
                    navbar   : {
                        hidden: true
                    },
                    toolbar  : {
                        hidden: true
                    },
                    footer   : {
                        hidden: true
                    },
                    sidepanel: {
                        hidden: true
                    }
                }
            };
        }
        this.systemUsersModel=new SystemUsersModel();
        this.loginFormErrors = {
            email: {},
            password: {}
        };
    }
    //Login Function 05/16/2018
    // _tokenParams: TokenParams
    lgusername: string;
    lgpassword: string;
  
   
    DoLogin(): void {
        this.systemUsersModel.username = this.lgusername;
        this.systemUsersModel.password = this.lgpassword;
        this.aPICallsService.AuthenticateUser(this.systemUsersModel).subscribe(data => {
            this.localStorageService.SetAuthorizationData(data);
            this.router.navigate(['Users/UserComponent']);
        }, (error) => {
            debugger;
            console.log(error + "Auth Service(Login)-Error");
        });
    }

   
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            lgusername: ['', [Validators.required]],
            lgpassword: ['', Validators.required]
        });
        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }
    onLoginFormValuesChanged() {
        for (const field in this.loginFormErrors) {
            if (!this.loginFormErrors.hasOwnProperty(field)) {
                continue;
            }
            // Clear previous errors
            this.loginFormErrors[field] = {};
            // Get the control
            const control = this.loginForm.get(field);
            if (control && control.dirty && !control.valid) {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
}
