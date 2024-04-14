import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { SharedModule } from '../../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../../Services/category.service';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [SharedModule, CommonModule],
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.css',
})
export class ViewCategoryComponent {
  id: string;
  categoryList:any;
  constructor(
    private spinerService: NgxSpinnerService,
    private categoryService: CategoryService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, any>
  ) {
    this.id = this.context.data.id; // Access the ID passed from the dialog service
    if (this.id != null || this.id != undefined) {
      this.getCategoryById(this.id);
    }
  }

  getCategoryById(id: any) {
    this.spinerService.show();
    this.categoryService.getCategoryById(id).subscribe(
      (res: any) => {
        debugger
        this.categoryList = res;
        this.spinerService.hide();
      },
      (error: any) => {
        this.spinerService.hide();
      }
    );
  }
  closeDialog(confirmed: boolean): void {
    this.context.completeWith(confirmed);
  }
}
