import { EditorConfiguration } from "codemirror";

export interface CeCodeEditorConfig extends EditorConfiguration {
    showSave?: boolean;
    enableHistory?: boolean;
    enableSearch?: boolean;
    acceptedDropFileExtensions?: string[];
    readOnly?: boolean;
    preserveContent?: boolean;
}