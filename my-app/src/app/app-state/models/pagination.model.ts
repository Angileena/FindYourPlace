export class Pagination {
    public totalCount: number = 0;
    public currentPage: number = 1;
    public isVisible: boolean = false;
    public isPerPageAll: boolean = false;
    public _recordsPerPage: number = 5;
    get recordsPerPage(): number {
        if (this.isPerPageAll) {
            return this.totalCount;
        } else {
            return this._recordsPerPage;
        }
    }
    set recordsPerPage(recordsPerPage: number) {
        this._recordsPerPage = recordsPerPage;        
    }
}