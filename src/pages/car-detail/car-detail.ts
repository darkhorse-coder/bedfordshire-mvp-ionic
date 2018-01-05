import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { AuthenticationPage } from '../authentication/authentication';
import { SuccessfulPage } from '../successful/successful';

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
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public alertCtrl: AlertController,
        public modalCtrl: ModalController
    ) {
        this.car = this.navParams.data;
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
        if (localStorage.getItem('isLogin'))
            this.confirmAuth();
        else
            this.confirmAuth();
    }

    onAddToCart (car_id: number) {
        this.confirmAuth();
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
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Agree',
                    handler: () => {
                        // this.navCtrl.push();
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
                        this.navCtrl.push(SuccessfulPage);
                    }
                }
            ]
        });
        prompt.present();
    }
}
