import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CeCodeEditorComponent, CeCodeEditorModule } from '@codeffekt/ce-code-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CeFormModule } from '@codeffekt/ce-core';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    CeFormModule,
    CeCodeEditorModule,
    CeCodeEditorComponent,   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
