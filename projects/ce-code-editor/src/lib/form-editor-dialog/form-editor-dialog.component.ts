import { CommonModule } from '@angular/common';
import { Component, ElementRef, Inject, inject } from '@angular/core';
import { CodeEditorHeaderComponent } from '../code-editor/code-editor-header';
import { CodeEditorContentComponent } from '../code-editor/code-editor-content';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CodeEditorService } from '../code-editor/code-editor.service';
import { FormInstance } from '@codeffekt/ce-core-data';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

export interface FormEditorJsonConfig {
  form: FormInstance;
}

@Component({
  selector: 'ce-form-editor-dialog',
  imports: [
    CommonModule,
    CodeEditorHeaderComponent,
    CodeEditorContentComponent,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    CodeEditorService,
  ],
  templateUrl: './form-editor-dialog.component.html',
  styleUrl: './form-editor-dialog.component.scss'
})
export class FormEditorDialogComponent {

  private dialogRef = inject(MatDialogRef<FormEditorDialogComponent>);
  private elementRef = inject(ElementRef);
  private codeEditorService = inject(CodeEditorService);

  isCodeValid = this.codeEditorService.isCodeValid.asReadonly();

  dialogOpened = toSignal(this.dialogRef.afterOpened().pipe(
    map(() => true)
  ), { initialValue: false });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FormEditorJsonConfig,
  ) {
    this.codeEditorService.setRoot(this.elementRef);
  }

  dismiss() {
    this.dialogRef.close()
  }

  onSave() {
    if (this.codeEditorService.isCodeValid()) {
      this.dialogRef.close(this.codeEditorService.save());
    }
  }

}


