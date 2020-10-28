import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";

@Component({
    selector: 'my-pagination',
    templateUrl: './my-pagination.component.html',
    styleUrls: ['./my-pagination.component.scss']
})

export class MyPaginationComponent implements OnChanges {
    

    @Input() currentPage: number = 0; // the current page
    @Input() count: number = 0; // how many total items there are in all pages
    @Input() perPage: number = 0; // how many items we want to show per page

    @Output() goPrev = new EventEmitter<boolean>();
    @Output() goNext = new EventEmitter<boolean>();
    @Output() goPage = new EventEmitter<number>();
    @Output() perPageNewValue = new EventEmitter<number>();

    pagesToShow: number = 5; // how many pages between next/prev

    numOfItemsPerPage: number = 5;

    constructor() { }

    minPage: number = 0;
    maxPage: number = 0;

    ngOnInit() {
        this.minPage = this.getMin();
        this.maxPage = this.getMax();        
    }

    getMin(): number {
        return ((this.perPage * this.currentPage) - this.perPage) + 1;
    }

    getMax(): number {        
        let max = this.perPage * this.currentPage;
        if (max > this.count) {
            max = this.count;
        }
        return max;
    }

    getLast() {
        var pageNum = Math.ceil(this.count / this.perPage);
        this.goPage.emit(pageNum);
    }

    getFirst() {
        var pageNum = 1;
        this.goPage.emit(pageNum);
    }

    onPage(n: number): void {
        this.goPage.emit(n);
    }

    onPrev(): void {
        if (this.currentPage > 1)
            this.goPrev.emit(true);
    }

    onNext(next: boolean): void {
        if (!((this.perPage * this.currentPage) > this.count))
            this.goNext.emit(next);
    }

    totalPages(): number {
        return Math.ceil(this.count / this.perPage) || 0;
    }

    onNumOfItemsPerPageChange(value: number): void {
        let number = Number(value);
        this.perPageNewValue.emit(number);
    }

    lastPage(): boolean {
        return this.perPage * this.currentPage >= this.count;
    }

    getPages(): number[] {
        const c = Math.ceil(this.count / this.perPage);
        const p = this.currentPage || 1;
        const pagesToShow = this.pagesToShow || 5;
        const pages: number[] = [];
        pages.push(p);
        const times = pagesToShow - 1;
        for (let i = 0; i < times; i++) {
            if (pages.length < pagesToShow) {
                if (Math.min.apply(null, pages) > 1) {
                    pages.push(Math.min.apply(null, pages) - 1);
                }
            }
            if (pages.length < pagesToShow) {
                if (Math.max.apply(null, pages) < c) {
                    pages.push(Math.max.apply(null, pages) + 1);
                }
            }
        }
        pages.sort((a, b) => a - b);
        return pages;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.perPage) {
            switch (this.perPage) {
                case 5:
                case 10:
                case 25:
                case 50:
                    this.numOfItemsPerPage = this.perPage;
                    break;
                default:
                    this.numOfItemsPerPage = 0;
                    break;
            }            
        }
    }
}