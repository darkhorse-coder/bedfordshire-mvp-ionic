import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { User } from '../../providers/car/car';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

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
    car: any;
    cartAry: any;
    constructor(public navCtrl: NavController, 
        public navParams: NavParams, 
        public viewCtrl: ViewController, 
        public alertCtrl: AlertController,
        public toastCtrl: ToastController
    ) {
        this.initUserInfo();
        this.car = JSON.parse(localStorage.getItem('carInfo'));
    }

    initUserInfo () {
        this.user = new User();
        let status = eval(localStorage.getItem('isLogin'));
        //console.log(status);
        if (status){
            this.user = JSON.parse(localStorage.getItem('userInfo'));
            this.cartAry = JSON.parse(localStorage.getItem('cart'));
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
            if (localStorage.getItem('gameState') == '1')
                this.purchaseCar(); 
            else if (localStorage.getItem('gameState') == '2')
                this.addToCart(this.car.id);
        },500);
        this.viewCtrl.dismiss();
    }

    addToCart (car_id : number) {
        this.cartAry.push(car_id);
        localStorage.setItem('cart', JSON.stringify(this.cartAry));
        this.showSuccessToast('Successful added to cart. '+ this.car.name +', $'+ this.car.price +'');
    }

    // Progressing purchase
    purchaseCar () {
        let prompt = this.alertCtrl.create({
            title: this.car.name,
            message: this.car.price + this.car.unit + "\n Please confirm your card number.",
            inputs: [
                {
                    name: 'cardnumber',
                    placeholder: 'CardNumber'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        
                    }
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        //this.navCtrl.push(SuccessfulPage);
                        this.showSuccessToast('Your offer was added successfully! we will email to your email '+this.user.email+' or call to your phone ' + this.user.mobile + '. Please wait for a while...');
                    }
                }
            ]
        });
        prompt.present();
    }

    showSuccessToast (msg) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
    }

}
