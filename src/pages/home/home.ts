import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ServicesProvider } from '../../providers/services/services';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { CarDetailPage } from '../car-detail/car-detail';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    cars: any;
    searchOn: boolean;
    allCars: any;
    constructor(public navCtrl: NavController, public navParam: NavParams, public serives: ServicesProvider) {

    }

    ionViewDidLoad(){
        this.initVariables();
    }

    initVariables() {
        this.searchOn = false;
        this.serives.getCars().subscribe(data => {
            this.allCars = data['cars'];  
            this.searchInit();
        });
    }

    searchInit() {
        this.cars = this.allCars;
    }

    searchToggle() {
        if(this.searchOn)
            this.searchOn = false;
        else
            this.searchOn = true;
    }

    getItems(ev: any) {
        // Reset items back to all of the items
        this.searchInit();
    
        // set val to the value of the searchbar
        let val = ev.target.value;
    
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.cars = this.cars.filter((item) => {
                return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.model.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
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
