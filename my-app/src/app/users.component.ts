import { Component, OnInit, Input, OnChanges, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from './app-state/models/pagination.model';
import { Venue } from './app-state/models/venue.model';

@Component({
  selector: 'app-venues',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor() { }

  @Input() venuesEvent: Observable<Venue[]>;
  
  pagination:Pagination = new Pagination();
  pageVenues: Venue[];
  venues:Venue[];
  ngOnInit(): void {
    this.venuesEvent.subscribe(venues => {
      this.venues = venues;
      this.pagination.currentPage = 1;
      this.getVenuesPerPage();
      this.IsPaginationVisible();
     });
  }

  public IsPaginationVisible() {
    if ((5 != this.pagination.recordsPerPage) && (0 < this.pagination.totalCount)) {
        this.pagination.isVisible = true;
    }
    else if (this.pagination.totalCount > this.pagination.recordsPerPage) {
        this.pagination.isVisible = true;
    }
    else {
        this.pagination.isVisible = false;
    }
}

perPageChange(itemsPerPage: number): void {
    if (itemsPerPage == 0) {
        this.pagination.isPerPageAll = true;
        this.pagination.recordsPerPage = this.pagination.totalCount;
    } else {
        this.pagination.recordsPerPage = itemsPerPage;
        this.pagination.isPerPageAll = false;
    }
    this.goToPage(1);
}

goToPage(n: number): void {
    this.pagination.currentPage = n;
    this.getVenuesPerPage();
}

onNext(): void {
    this.pagination.currentPage++;
    this.getVenuesPerPage();
}

onPrev(): void {
    this.pagination.currentPage--;
    this.getVenuesPerPage();
    this.IsPaginationVisible();      
}

public getVenuesPerPage() {
  this.pageVenues = new Array<Venue>();
  this.pagination.totalCount = this.venues.length;  
  if (this.pagination.totalCount <= this.pagination.recordsPerPage) {
      this.pageVenues = this.venues;
  } else {
      let index = 0
      if (this.pagination.currentPage > 1)
          index = (this.pagination.currentPage - 1) * this.pagination.recordsPerPage;
      var endIndex = index + this.pagination.recordsPerPage;
      if (endIndex > this.pagination.totalCount)
          endIndex = this.pagination.totalCount;
      for (var i = index; i < endIndex ; i++) {
          this.pageVenues.push(this.venues[i]);
      }
  }
}
}
