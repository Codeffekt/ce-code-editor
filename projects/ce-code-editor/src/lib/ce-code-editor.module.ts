import { NgModule } from '@angular/core';
import { FormBlockStoreService } from '@codeffekt/ce-core';
import { FormObjectBlockComponent } from './form-object-block';
@NgModule()
export class CeCodeEditorModule { 
  constructor(
    readonly store: FormBlockStoreService,
  ) {
    store.setComponents({
      'object': FormObjectBlockComponent,
    });
  }
}
