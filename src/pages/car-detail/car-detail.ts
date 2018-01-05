import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AuthenticationPage } from '../authentication/authentication';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

/**
 * Generated class for the CarDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;

@IonicPage()
@Component({
  selector: 'page-car-detail',
  templateUrl: 'car-detail.html',
})
export class CarDetailPage {
    @ViewChild('map') mapElement: ElementRef;
    map : any;
    car : any;
    user : any;
    cartAry : any;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public alertCtrl: AlertController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController
    ) {
        this.car = this.navParams.data;
        localStorage.setItem('carInfo',JSON.stringify(this.car));
        if(localStorage.getItem('cart'))
            this.cartAry = JSON.parse(localStorage.getItem('cart'));
        else
            this.cartAry = new Array();
    }
    
    ionViewDidLoad () {
        this.loadMap();
    }
     
    loadMap () {
    
        let latLng = new google.maps.LatLng(this.car.location.lat, this.car.location.lng);
        
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
        new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.map.getCenter()
        });
    }   

    onBuyCar (car_id: number) {
        if (eval(localStorage.getItem('isLogin'))){
            this.user = JSON.parse(localStorage.getItem('userInfo'));
            this.purchaseCar();
        } else {
            localStorage.setItem('gameState','1'); // buy state 1
            this.confirmAuth();
        }
    }

    onAddToCart (car_id: number) {
        if (eval(localStorage.getItem('isLogin'))){
            this.user = JSON.parse(localStorage.getItem('userInfo'));
            this.addToCart(car_id);
        } else {
            localStorage.setItem('gameState','2'); // add state 2
            this.confirmAuth();
        }
    }

    // Confirm if user logged in
    confirmAuth () {
        let confirm = this.alertCtrl.create({
            title: 'Authentication!',
            message: 'If you want to forward, we need your contact informations. Are you agree?',
            buttons: [
                {
                    text: 'Cancel',
                    handler: () => {
                        localStorage.setItem('gameState','0');
                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        this.showAuthModal();
                    }
                }
            ]
        });
        confirm.present();
    }

    // Show Authentication modal
    showAuthModal () {
        let modal = this.modalCtrl.create(AuthenticationPage);
        modal.present();
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
                        this.showSuccessToast('Your offer was added successfully! we will email to your email '+this.user.email+' or call to your phone ' + this.user.mobile + '. Please wait for a while...');
                    }
                }
            ]
        });
        prompt.present();
    }

    showSuccessToast (msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000
        });
        toast.present();
        this.navCtrl.pop();
    }

    addToCart (car_id : number) {
        console.log(this.cartAry);
        for(let i = 0; i < this.cartAry.length; i++){
            if(this.cartAry[i] == car_id) {
                this.showSuccessToast('Already this car is added on your cart. Please check your cart');
                return;
            }
        }
        
        this.cartAry.push(car_id);
        localStorage.setItem('cart', JSON.stringify(this.cartAry));
        this.showSuccessToast('Successfully added '+ this.car.name + ' with $' + this.car.price);
    }
 }
