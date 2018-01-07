import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { CarDetailPage } from '../car-detail/car-detail';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
    selector: 'page-cart',
    templateUrl: 'cart.html',
})
export class CartPage {
    cars: any;
    cartAry: any;
    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public serivces: ServicesProvider
    ) {
        this.serivces.getCars().subscribe(data=> {
            this.loadCartCars(data['cars']);
        });
        this.cartAry = new Array();
        this.cars = new Array();
    }

    loadCartCars(car) {
        if(localStorage.getItem('cart')){
            this.cartAry = JSON.parse(localStorage.getItem('cart'));
            for (let j = 0; j < car.length; j++){
                for(let i = 0; i < this.cartAry.length; i++){
                    if(car[j].id == this.cartAry[i]){
                        this.cars.push(car[j]);
                    }
                }
            }
        }
    }

    onCarDetail (car_id) {
        let selectedCar = {};
        for(let i = 0; i < this.cars.length; i++) {
            if(this.cars[i].id == car_id) {
                selectedCar = this.cars[i];
            }
        }

        this.navCtrl.push(CarDetailPage, selectedCar);
    }

}
