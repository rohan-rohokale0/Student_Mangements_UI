import { Component } from '@angular/core';
import {  Inject } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css'
})
export class DeleteCourseComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT) private readonly context: TuiDialogContext<boolean>
  ) {}

  closeDialog(confirmed: boolean): void {
    this.context.completeWith(confirmed);
  }
}
