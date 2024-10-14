import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CeCodeEditorComponent } from './code-editor.component';
import { FormsModule } from '@angular/forms';
import { CeCodeMirrorComponent } from './code-mirror/code-mirror.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxFileDropModule } from 'ngx-file-drop';
import { StringArrayToStringPipe } from './array-to-string.pipe';
@NgModule({
  declarations: [
    CeCodeEditorComponent,
    CeCodeMirrorComponent,
    StringArrayToStringPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,    
    NgxFileDropModule
  ],
  exports: [
    CeCodeEditorComponent
  ]
})
export class CeCodeEditorModule { }
