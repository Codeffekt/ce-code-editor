import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { CeCodeEditorConfig } from '../code-editor-config';
import { CodeEditorService } from './code-editor.service';
import { CodeEditorHeaderComponent } from './code-editor-header';
import { CodeEditorContentComponent } from "./code-editor-content";

@Component({
  selector: 'ce-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  imports: [
    CommonModule,    
    CodeEditorHeaderComponent,
    CodeEditorContentComponent
],
  providers: [
    CodeEditorService,
  ]
})
export class CeCodeEditorComponent {

  @Input() code = "";
  @Input() title: string | undefined;
  @Input() expanded = false;
  @Output() codeChanges = new EventEmitter();
  @Output() save = new EventEmitter();
  @Input() config!: CeCodeEditorConfig; 

  private elementRef = inject(ElementRef);
  private codeEditorService = inject(CodeEditorService);  

  constructor() {
    this.codeEditorService.setRoot(this.elementRef);
  }  

  onSave(save: Object) {
    this.save.next(save);
  }

  onCodeChange(code: string) {      
      this.codeChanges.next(code);    
  }
}
