import { effect, ElementRef, Injectable, signal } from "@angular/core";
import { Editor } from "codemirror";
import { CeCodeEditorConfig } from "../code-editor-config";

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

@Injectable()
export class CodeEditorService {

    code = signal<string>("");
    save = signal<Object>({});
    expanded = signal<boolean>(false);
    isSearching = signal<boolean>(false);
    undoable = signal<boolean>(false);
    redoable = signal<boolean>(false);
    isCodeValid = signal<boolean>(true);

    config = signal<CeCodeEditorConfig>(DEFAULT_CODE_EDITOR_CONFIG);

    private root!: ElementRef;
    private codeMirror!: Editor;

    constructor() {
        effect(() => {
            try {
                const validCode = JSON.parse(this.code());
                this.isCodeValid.set(true);
                this.save.set(validCode);
            } catch(err) {
                this.isCodeValid.set(false);
            }
        });
    }

    setRoot(root: ElementRef) {
        this.root = root;
    }

    setCodeMirror(codeMirror: Editor) {
        this.codeMirror = codeMirror;
        this.codeMirror.setSize(null, "auto");
    }

    setConfig(config: CeCodeEditorConfig) {
        this.config.set({...DEFAULT_CODE_EDITOR_CONFIG, ...config});
    }

    setCode(code: string) {
        this.code.set(code);
    }

    doFullscreen() {
        if (!document.fullscreenElement) {
            // If the document is not in full screen mode
            // make the video full screen
            this.root.nativeElement.requestFullscreen();
            this.expanded.set(true);
        } else {
            // Otherwise exit the full screen
            document.exitFullscreen?.();
            this.expanded.set(false);
        }
    }

    toggleSearch() {
        if (!this.isSearching()) {
            this.codeMirror?.execCommand("find");
        } else {
            this.codeMirror?.focus();
        }

        this.isSearching.set(!this.isSearching());
    }

    onCodeChange(code: string) {
        this.code.set(code);
        this.undoable.set((this.codeMirror!.getDoc().historySize().undo > 1));
        this.redoable.set((this.codeMirror!.getDoc().historySize().redo > 0));
    }

    onUndo() {
        this.codeMirror?.execCommand("undo");

    }

    onRedo() {
        this.codeMirror?.execCommand("redo");
    }   
}