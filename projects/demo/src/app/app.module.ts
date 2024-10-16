import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CeCodeEditorModule } from '@codeffekt/ce-code-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatTabsModule,
    CeCodeEditorModule,        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
