import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from '../../../Services/student.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { CategoryService } from '../../../Services/category.service';
import { TuiStringHandler, TuiValidationError } from '@taiga-ui/cdk';
import { TuiFileLike, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { CourseService } from '../../../Services/course.service';

interface categoryModel {
  id: number;
  categoryName: string;
}
@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: (item: categoryModel) => `${item.categoryName} `,
    }),
  ],
})
export class AddCourseComponent {
  addStudentForm!: FormGroup;
  categoryList: any;
  imageSrc: string | ArrayBuffer | null = null;
  saveImageSrc: string | ArrayBuffer | null = null;
  rejectedFiles: readonly TuiFileLike[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private spinerService: NgxSpinnerService,
    private courseService: CourseService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getCategoryList();
  }


  initForm() {
    this.addStudentForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      courseName: ['', Validators.required],
      teacherName: ['', Validators.required],
      categoryName: ['', Validators.required],
      price: ['', Validators.required,Validators.pattern(/^(\d*\.?\d+|\d+\.?\d*)$/)],
      description: ['', Validators.required],
      courseImage: [''],
    });
  }
  stringify: TuiStringHandler<categoryModel> = (item) => item.categoryName;

  getCategoryList() {
    this.spinerService.show();
    this.categoryService.getAllCategory().subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.categoryList = res;
          this.addStudentForm.controls['categoryName'].setValue(
            this.categoryList[0]
          );
          this.spinerService.hide();
        }
        this.spinerService.hide();
      },
      (error) => {
        this.spinerService.hide();
      }
    );
  }
  removeFile(): void {
    this.addStudentForm.controls['courseImage'].setValue(null);
    this.imageSrc='';
  }

  addStudent(form: any) {
    if (this.addStudentForm.invalid) {
      return;
    }
    const payload = {
      courseName: form.courseName,
      teacherName: form.teacherName,
      title: form.title,
      description: form.description,
      courseImage: this.imageSrc,
      categoryId: form.categoryName.id,
      price:form.price
    };
    this.courseService.AddCourse(payload).subscribe(
      (response) => {
        if (response.success) {
          this.backToCourseList();
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

  backToCourseList() {
    this.router.navigate(['/admin/course']);
  }

  onFileSelected(event: any): void {
    this.spinerService.show();
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Ensure reader result is not null and assert as string
        if (reader.result !== null && typeof reader.result === 'string') {
          // Set the image source to the base64 string
          this.imageSrc = reader.result;
          const base64String = reader.result.split(',')[1];
          this.saveImageSrc = base64String;
          this.spinerService.hide();
        } else {
          console.error('FileReader result is null or not a string');
          this.spinerService.hide();
        }
      };
      reader.readAsDataURL(file);
      this.spinerService.hide();
    } else {
      this.spinerService.hide();
      console.error('No file selected');
    }
  }

  onFileChange() {
    this.addStudentForm.get('courseImage')?.valueChanges.subscribe((files) => {
      if (files) {
        const file = files;
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.result !== null && typeof reader.result === 'string') {
            const base64String = reader.result.split(',')[1];
            this.imageSrc= base64String;
          } else {
            console.error('FileReader result is null or not a string');
          }
        };
        reader.readAsDataURL(file);
      }
    
    });
  }

  closeImage() {
    this.imageSrc = '';
    this.saveImageSrc = null;
  }
}
