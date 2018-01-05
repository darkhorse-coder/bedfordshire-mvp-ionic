import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, catchError, tap } from 'rxjs/operators';
/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
    
    constructor(public http: HttpClient) {
        
    }

    getCars(): Observable<{}>  {
        return this.http.get('../../assets/dummy.json').pipe(
            map(this.extractData),
            catchError(this.handleError),
            tap(this.progressData)
        );
    }

    private progressData(res: Response) {
        console.log(res);
    }
    
    private extractData(res: Response) {
        let body = res;
        return body || { };
    }

    private handleError (error: Response | any) {
        let errMsg : string;
        if (error instanceof Response) {
            const err = error || '';
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

}
