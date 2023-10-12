import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { Editor } from 'codemirror';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { CeCodeEditorConfig } from './code-editor-config';


const DEFAULT_CODE_EDITOR_CONFIG: CeCodeEditorConfig = {
  preserveContent: true,
  showSave: true,
  enableHistory: true,
  enableSearch: true,
  acceptedDropFileExtensions: [],
  readOnly: false,
  lint: true,
  foldGutter: true,
  theme: 'eclipse',
  lineNumbers: true,
  mode: "application/json",
  gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
}
@Component({
  selector: 'ce-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CeCodeEditorComponent implements OnInit {

  @Input() code = "";
  @Input() title: string | undefined;
  @Input() expanded = false;
  @Output() codeChanges = new EventEmitter();
  @Output() save = new EventEmitter();
  @Input() config!: CeCodeEditorConfig;

  redoable = false;
  undoable = false;
  isSearching = false;

  private codeMirror: Editor | undefined;

  constructor(private ngZone: NgZone) { }

  ngOnInit() {
    this.config = { ...DEFAULT_CODE_EDITOR_CONFIG, ...this.config };
  }

  onCodeMirrorLoaded(codeMirror: Editor) {
    this.ngZone.run(() => {
      this.codeMirror = codeMirror;

      if (this.expanded) {
        this.codeMirror.setSize(null, "auto");
      } else {
        this.codeMirror.setSize(null, "800px");
      }
    });
  }

  onFocus() {
    this.ngZone.run(() => {
      if (this.isSearching) {
        this.toggleSearch();
      }
    });
  }

  onSave() {
    this.save.next(JSON.parse(this.code));
  }

  toggleExpansion() {
    if (!this.expanded) {
      this.codeMirror?.setSize(null, "auto");
    } else {
      this.codeMirror?.setSize(null, "800px");
    }
    this.expanded = !this.expanded;
  }

  onUndo() {
    this.codeMirror?.execCommand("undo");

  }

  onRedo() {
    this.codeMirror?.execCommand("redo");
  }

  toggleSearch() {
    if (!this.isSearching) {
      this.codeMirror?.execCommand("find");
    } else {
      this.codeMirror?.focus();
    }

    this.isSearching = !this.isSearching;
  }

  onCodeChange() {
    this.ngZone.run(() => {
      this.undoable = (this.codeMirror!.getDoc().historySize().undo > 1);
      this.redoable = (this.codeMirror!.getDoc().historySize().redo > 0);
      this.codeChanges.next(this.code);
    });
  }

  onFileDropped(files: NgxFileDropEntry[]) {
    const droppedFile = files[0]
    if (droppedFile.fileEntry.isFile) {
      const fileEntry: any = droppedFile.fileEntry;
      fileEntry.file((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.code = reader.result as string;
        }
        reader.readAsBinaryString(file);
      });
    }
  }
}
