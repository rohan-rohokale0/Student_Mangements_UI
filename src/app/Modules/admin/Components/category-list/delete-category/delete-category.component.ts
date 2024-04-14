import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { NgxSpinnerService } from 'ngx-spinner';
import { CategoryService } from '../../../Services/category.service';
@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './delete-category.component.html',
  styleUrl: './delete-category.component.css',
})
export class DeleteCategoryComponent {
  id: string;

  constructor(private spinerService:NgxSpinnerService,private categoryService:CategoryService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, any>
  ) {
    this.id = this.context.data.id;
  }

  closeDialog(confirmed: boolean): void {
    this.context.completeWith(confirmed);
  }

  deleteCategory() {
    this.spinerService.show();
    this.categoryService.deleteCategory(this.id).subscribe(
      (response: { success: any; }) => {
        if (response.success) {
        this.closeDialog(true);
          this.spinerService.hide();
        }
      },
      (error: any) => {
        this.spinerService.hide();
        console.error('Error saving data:', error);
      }
    );
  }
}
