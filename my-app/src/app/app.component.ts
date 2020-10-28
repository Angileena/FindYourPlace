import { Component, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Venue } from './app-state/models/venue.model';
import { Address } from './app-state/models/address.model';
import { LatLng } from './app-state/models/latlng.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnDestroy {

    title = 'Exam';

  searchForm = new FormGroup({
    category: new FormControl('', Validators.nullValidator && Validators.required),
  });

  venues: Venue[] = [];  
  venueCount = 0;
  zoom = 12
  center: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  
  venuesSubject = new BehaviorSubject<Venue[]>(new Array<Venue>());
  changedVenues = this.venuesSubject.asObservable();

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private appService: AppService) {}

  ngOnInit(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
  
  onSubmit() {
    let latLng: LatLng = new LatLng();
    latLng.lat = this.center.lat;
    latLng.lng = this.center.lng;
    latLng.category = this.searchForm.value.category;
    this.appService.getVenues(latLng).pipe(takeUntil(this.destroy$)).subscribe(data => {
      for(var item of data.response.groups[0].items){
         let venue = new Venue();
         venue.Name =  item.venue.name;
         venue.Address = new Address();
         venue.Address.Address1 = item.venue.location.address;
         venue.Address.Country = item.venue.location.country;
         venue.Address.City = item.venue.location.city;
         venue.Address.PostalCode = item.venue.location.postalCode;
         venue.LatLng = new LatLng();
         venue.LatLng.lng = item.venue.location.lng;
         venue.LatLng.lat = item.venue.location.lat;
         this.venues.push(venue);          
      }
      this.venueCount = this.venues.length;
      this.venuesSubject.next(this.venues);
      this.searchForm.reset();
    })
  }

  mapsClick(event: google.maps.MouseEvent) {
    this.center.lat = event.latLng.lat();
    this.center.lng = event.latLng.lng();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
