import { Component, ViewChild } from '@angular/core';
import { CeCodeEditorComponent, CeCodeEditorConfig } from '@codeffekt/ce-code-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(CeCodeEditorComponent) codeEditorComponent?: CeCodeEditorComponent;

  code = `{
    "id": "form-all-types",
    "root": "forms-context-final",
    "ctime": 1606726182039,
    "mtime": 1609919868099,
    "table": "test",
    "title": "Formulaire de démonstration",
    "valid": true,
    "author": "2f21f5d17b1d",
    "content": {
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
    },
    "fields": {}
  }`;

  config: CeCodeEditorConfig = {
    preserveContent: true
  }

  async saveCode(code: any) {
    console.log(code);
  }
}
