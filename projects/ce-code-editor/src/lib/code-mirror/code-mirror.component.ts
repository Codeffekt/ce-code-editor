import {
    AfterViewInit, Component, DoCheck, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import '@mdbarr/codemirror-json-lint';
import { Editor, fromTextArea } from 'codemirror';
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/fold/brace-fold.js";
import 'codemirror/addon/fold/foldcode';
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/lint/lint.js";
import "codemirror/addon/search/search.js";
import "codemirror/addon/search/searchcursor.js";
import 'codemirror/mode/javascript/javascript.js';
import { CeCodeEditorConfig } from '../code-editor-config';

@Component({
    selector: 'ce-codemirror',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CeCodeMirrorComponent),
            multi: true
        }
    ],
    templateUrl: './code-mirror.component.html'
})
export class CeCodeMirrorComponent implements AfterViewInit, OnInit, DoCheck {

    @Input() config: CeCodeEditorConfig | undefined;
    @Output() instance: Editor | undefined;
    @Output() blur = new EventEmitter();
    @Output() focus = new EventEmitter();
    @Output() change = new EventEmitter();
    @Output() cursorActivity = new EventEmitter();
    @Output() load = new EventEmitter();
    @ViewChild('codeMirror') codeMirrorElt!: ElementRef;
    private _value: any;

    private sizeChanged = false;

    ngOnInit(): void {
        this.sizeChanged = !this.config?.preserveContent;
    }

    ngAfterViewInit() {
        this.config = this.config || {};
        this.initCodemirror(this.config);
    }

    get value() { return this._value; }

    @Input() set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    ngDoCheck(): void {
        if (!this.sizeChanged && this.instance && this.instance.getWrapperElement().clientHeight !== 0) {
            this.sizeChanged = true;
            this.instance.refresh();
        }
    }

    updateValue(value: any) {
        this.value = value;
        this.change.emit(value);
    }

    writeValue(value: any) {
        this._value = value || '';

        if (this.instance) {
            this.instance.setValue(this._value);
        }
    }

    onChange!: (value: string | undefined) => void;

    registerOnChange(fn: any): void { this.onChange = fn; }

    registerOnTouched(fn: any): void { }

    private async initCodemirror(config: any) {
        this.instance = fromTextArea(this.codeMirrorElt.nativeElement, config);

        this.instance.setValue(this._value);

        this.load.emit(this.instance);

        this.instance.on('change', () => {
            this.updateValue(this.instance?.getValue());
        });

        this.instance.on('focus', (instance: any, event: any) => {
            this.focus.emit({ instance, event });
        });

        this.instance.on('cursorActivity', (instance: any) => {
            this.cursorActivity.emit({ instance });
        });

        this.instance.on('blur', (instance: any, event: any) => {
            this.blur.emit({ instance, event });
        });
    }
}