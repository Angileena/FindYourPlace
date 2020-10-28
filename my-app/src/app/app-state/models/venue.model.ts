import { Address } from './address.model';
import {LatLng} from './latlng.model';

export class Venue {
  Name: string;
  PostalCode: string;
  email: string;
  LatLng: LatLng;
  Address: Address;
}
