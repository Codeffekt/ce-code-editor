import { CommonModule } from '@angular/common';
import { Component, computed, EventEmitter, inject, input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CodeEditorService } from '../code-editor.service';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ce-code-editor-header',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './code-editor-header.component.html',
  styleUrl: './code-editor-header.component.scss'
})
export class CodeEditorHeaderComponent {

  @Output() save = new EventEmitter();

  private codeEditorService = inject(CodeEditorService);
  private config = this.codeEditorService.config.asReadonly();


  expanded = this.codeEditorService.expanded.asReadonly();
  undoable = this.codeEditorService.undoable.asReadonly();
  redoable = this.codeEditorService.redoable.asReadonly();
  isCodeValid = this.codeEditorService.isCodeValid.asReadonly();

  enableSearch = computed(() => this.config().enableSearch);
  readOnly = computed(() => this.config().readOnly);
  enableHistory = computed(() => this.config().enableHistory);
  showSave = computed(() => this.config().showSave);

  title = input.required();

  toggleExpansion() {
    this.codeEditorService.doFullscreen();
  }

  toggleSearch() {
    this.codeEditorService.toggleSearch();
  }

  onUndo() {
    this.codeEditorService.onUndo();

  }

  onRedo() {
    this.codeEditorService.onRedo();
  }

  onSave() {
    if (this.codeEditorService.isCodeValid()) {
      this.save.next(this.codeEditorService.save());
    }
  }
}
