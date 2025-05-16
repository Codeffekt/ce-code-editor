import { Component, signal } from '@angular/core';
import { FormBlockObject } from '@codeffekt/ce-core-data';
import { CommonModule } from '@angular/common';
import { CeFormBlocksModule, FormBlockComponent } from '@codeffekt/ce-core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CeCodeEditorComponent } from '../code-editor.component';
import { CeCodeEditorConfig } from '../code-editor-config';

@Component({
  selector: 'lib-form-object-block',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    CeFormBlocksModule,
    CeCodeEditorComponent,
  ],
  templateUrl: './form-object-block.component.html',
  styleUrl: './form-object-block.component.scss'
})
export class FormObjectBlockComponent extends FormBlockComponent<FormBlockObject> {

  isEditMode = true;
  isCodeValid = true;

  code = signal("");

  config: CeCodeEditorConfig = {
    preserveContent: true,
    showSave: false,
  };
  
  onEditMode() {
    this.isEditMode = true;
  }

  onCancelEdit() {
    this.isEditMode = false;
    this.formBlockChanged();
  }

  onSave() {    
    try {
      const parsedCode = JSON.parse(this.code());
      this.patchValue(parsedCode);
      this.isCodeValid = true;
      this.isEditMode = false;
    } catch {
      this.isCodeValid = false;
    }
  }  

  onCodeChanges(code: string) {
    try {
      const parsedCode = JSON.parse(code);
      this.code.set(code);
      this.isCodeValid = true;
    } catch {
      this.isCodeValid = false;
    }
  }

  formBlockChanged(): void {
      this.code.set(JSON.stringify(this.formBlock.value ?? ""));
  }
}
