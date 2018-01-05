import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { User } from '../../providers/car/car';

/**
 * Generated class for the AuthenticationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-authentication',
    templateUrl: 'authentication.html',
})
export class AuthenticationPage {
    user: any;
    username: string;
    email: string;
    mobile: string;
    address: string;

    constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
        this.initUserInfo();
    }

    initUserInfo () {
        this.user = new User();
        let status = eval(localStorage.getItem('isLogin'));
        //console.log(status);
        if (status){
            this.user = JSON.parse(localStorage.getItem('userInfo'));
        }else{
            this.user.username = "";
            this.user.email = "";
            this.user.mobile = "";
            this.user.address = "";
        }        
    }

    // Close Modal View
    closeModal () {
        this.viewCtrl.dismiss();
    }

    // Register User Data
    registerInfo () {
        //console.log(this.user);
        // Storing user info to local storage
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('userInfo', JSON.stringify(this.user));

        setTimeout(()=> {
            this.viewCtrl.dismiss();
        },500);
    }

}
