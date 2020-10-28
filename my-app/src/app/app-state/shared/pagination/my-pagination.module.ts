import { MyPaginationComponent } from "./my-pagination.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        MyPaginationComponent
    ],
    exports: [
        MyPaginationComponent
    ]
})

export class MyPaginationModule { }


