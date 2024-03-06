import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CeCodeEditorModule } from '@codeffekt/ce-code-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CeCodeEditorModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
