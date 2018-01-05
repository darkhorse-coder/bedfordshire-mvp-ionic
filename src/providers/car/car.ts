import { Injectable } from '@angular/core';

/*
  Generated class for the CarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export class User {
    username : string;
    email : string;
    mobile : string;
    address : string;

    constructor() {
        this.username = '';
        this.email = '';
        this.mobile = '';
        this.address = '';
    }
}

@Injectable()
export class Car {
    id: number;
    name: string;
    model: string;
    color: string;
    price: number;
    unit: string;
    amount: number;
    location: {};
    gallery: Array<string>[];

    constructor() {
        
    }

    get carId(): number { return this.id; }
    get carModel(): string { return this.model; }
    get carPrice(): number { return this.price; }
    get carAmount(): number { return this.amount; }
    get carLocation(): any { return this.location; }
}
