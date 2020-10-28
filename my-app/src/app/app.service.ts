import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatLng } from './app-state/models/latlng.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  rootURL = '/api';
  FOURSQUARE_CLIENTID = 'GKUOUFT1X3LEBVA1ELRNEW0XVI4IGLEKZQTO152IHQKPLCPR';
  FOURSQUARE_CLIENTSECRET = '2YPUR30R5XXH2KUP14FQBIKJWLVTZVHHAN011MKLT1OCD3HO';
  FOURSQUARE_VENUEURL = 'https://api.foursquare.com/v2/venues/explore/'

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }

  addUser(user: any) {
    return this.http.post(this.rootURL + '/user', {user});
  }

  getVenues(latlng: LatLng){
    console.log(latlng)
    return this.http.get<any>(`${this.FOURSQUARE_VENUEURL}?client_id=${this.FOURSQUARE_CLIENTID}&client_secret=${this.FOURSQUARE_CLIENTSECRET}&v=20180323&ll=${latlng.lat},${latlng.lng}&query=${latlng.category}`);
  }

}
