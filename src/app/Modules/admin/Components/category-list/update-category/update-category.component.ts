import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../Services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  updateCategoryForm!: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private spinerService: NgxSpinnerService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, any>
  ) {
    this.id = this.context.data.id;
    if (this.id != null || this.id != undefined) {
      this.getCategoryById(this.id);
    }
  }

  getCategoryById(id: any) {
    this.spinerService.show();
    this.categoryService.getCategoryById(id).subscribe(
      (res: any) => {
        debugger
        this.updateCategoryForm.controls['categoryName'].setValue(res.categoryName);
        this.spinerService.hide();
      },
      (error: any) => {
        this.spinerService.hide();
      }
    );
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.updateCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
    });
  }

  closeDialog(confirmed: boolean): void {
    this.context.completeWith(confirmed);
  }

  updateCategory(form: any) {
    if (this.updateCategoryForm.invalid) {
      return;
    }
    const payload = {
      categoryName: form.categoryName,
    };
    this.categoryService.updateCategory(this.id,payload).subscribe(
      (response) => {
        if (response.success) {
          this.closeDialog(true);
        }
        this.spinerService.hide();
        console.log(response.message);
      },
      (error) => {
        this.spinerService.hide();
        console.error('Error saving data:', error);
      }
    );
  }


}
