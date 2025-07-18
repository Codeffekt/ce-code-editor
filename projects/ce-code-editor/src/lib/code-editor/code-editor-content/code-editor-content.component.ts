import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, input, Input, NgZone, OnInit, Output } from '@angular/core';
import { CeCodeMirrorComponent } from '../../code-mirror/code-mirror.component';
import { FormsModule } from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { StringArrayToStringPipe } from '../../array-to-string.pipe';
import { CodeEditorService } from '../code-editor.service';
import { Editor } from 'codemirror';
import { CeCodeEditorConfig } from '../../code-editor-config';

@Component({
  selector: 'ce-code-editor-content',
  imports: [
    CommonModule,
    FormsModule,
    NgxFileDropModule,
    StringArrayToStringPipe,
    CeCodeMirrorComponent,
  ],
  templateUrl: './code-editor-content.component.html',
  styleUrl: './code-editor-content.component.css'
})
export class CodeEditorContentComponent implements OnInit {

  @Input() code = "";  
  @Input() config!: CeCodeEditorConfig; 
  @Output() codeChanges = new EventEmitter();

  private codeEditorService = inject(CodeEditorService);
  private isSearching = this.codeEditorService.isSearching.asReadonly();

  acceptedDropFileExtensions = computed(() => this.codeEditorService.config().acceptedDropFileExtensions ?? []);

  editorConfig = this.codeEditorService.config.asReadonly();

  constructor(private ngZone: NgZone) {   
  }

  ngOnInit() {    
    this.codeEditorService.setConfig(this.config);
    this.codeEditorService.setCode(this.code);
  }

  onCodeMirrorLoaded(codeMirror: Editor) {
    this.ngZone.run(() => {
      this.codeEditorService.setCodeMirror(codeMirror);
    });
  }

  onFocus() {
    if (this.isSearching()) {
      this.codeEditorService.toggleSearch();
    }
  }

  onCodeChange(code: string) {
      this.codeEditorService.onCodeChange(code);
      this.codeChanges.next(code);    
  }

  onFileDropped(files: NgxFileDropEntry[]) {
      const droppedFile = files[0]
      if (droppedFile.fileEntry.isFile) {
        const fileEntry: any = droppedFile.fileEntry;
        fileEntry.file((file: File) => {
          const reader = new FileReader();
          reader.onload = () => {
            this.codeEditorService.setCode(reader.result as string);
          }
          reader.readAsBinaryString(file);
        });
      }
    }

}
