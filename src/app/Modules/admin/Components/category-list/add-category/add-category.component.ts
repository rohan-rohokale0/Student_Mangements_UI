import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { SharedModule } from '../../../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../Services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  addCategoryForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private spinerService: NgxSpinnerService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean>
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
    });
  }

  closeDialog(confirmed: boolean): void {
    this.context.completeWith(confirmed);
  }

  addCategory(form: any) {
    if (this.addCategoryForm.invalid) {
      return;
    }
    const payload = {
      categoryName: form.categoryName,
    };
    this.categoryService.AddCategory(payload).subscribe(
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
