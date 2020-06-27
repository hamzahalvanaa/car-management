import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HTTP) { }

  // Http Options
  httpOptions = {
    'Content-Type': 'application/json'
  }

  retrieveDataFromTagQrCode(id) {
    // let dataRes: any = [];
    return new Promise((resolve, reject) => {
      this.http.get(`${environment.apiUrl}data?qrcode=` + id, {}, this.httpOptions)
        .then((response) => {
          // dataRes.push(response);
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
  // retrieveDataFromTagQrCode(id): Observable<any> {
  //   return this.http
  //     .get<any>(`${environment.apiUrl}data?qrcode=` + id)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }
}
