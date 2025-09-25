import { Component, inject, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CeCodeEditorComponent, CeCodeEditorConfig, FormEditorDialogComponent } from '@codeffekt/ce-code-editor';
import { FormWrapper } from '@codeffekt/ce-core-data';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {

  @ViewChild(CeCodeEditorComponent) codeEditorComponent?: CeCodeEditorComponent;

  form: FormWrapper = FormWrapper.fromForm({
    "id": "form-all-types",
    "root": "forms-context-final",
    "ctime": 1606726182039,
    "mtime": 1609919868099,
    "table": "test",
    "title": "Formulaire de démonstration",
    "valid": true,
    "author": "2f21f5d17b1d",
    "content": {
      "data": {
        "type": "object",
        "field": "data",
        "label": "Data",
        "value": undefined,        
      },      
      "pid": {
        "type": "number",
        "field": "pid",
        "label": "PID"
      },    
      "color": {
        "type": "text",
        "field": "color",
        "label": "Couleur",
        "params": {
          "suggestions": [
            "rouge",
            "marron"
          ]
        }
      },   
      "plate": {
        "type": "text",
        "field": "plate",
        "label": "Plaque d'immatriculation",
        "params": {
          "validators": [
            {
              "name": "pattern",
              "params": {
                "value": "[A-Z]{2}[-][0-9]{3}[-][A-Z]{2}"
              }
            }
          ]
        }
      },
      "comment": {
        "type": "text",
        "field": "comment",
        "label": "Commentaire",
        "params": {
          "multiline": true
        }
      },
      "timestamp": {
        "type": "timestamp",
        "field": "timestamp",
        "label": "Date / Heure",
        "value": 1606726182039
      },
      "coordinates": {
        "type": "coordinates",
        "field": "coordinates",
        "label": "Coordonnées",
        "value": [],
        "params": {
          "useConverter": true
        }
      }   
    }    
  });  

  testUndefined = undefined;

  config: CeCodeEditorConfig = {
    preserveContent: true
  };

  lastModificationTimestamp = "";

  private dialog = inject(MatDialog);

  async saveCode(code: any) {
    console.log(code);
  }

  openJSONEditor() {

    const ref = this.dialog.open(
      FormEditorDialogComponent,
      { data: { form: this.form } }
    );

    ref.afterClosed()
      .pipe(
        filter(form => !!form)
      )
      .subscribe(form => this.form = form);
  }

  onFormChanges(updatedForm: FormWrapper) {    
    this.lastModificationTimestamp = new Date(updatedForm.core.mtime ?? updatedForm.core.ctime).toLocaleString();
  }
}
