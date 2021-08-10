import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import {SimpleFormElementComponent} from './layouts/simple/simple-form-element.component';
import {SimpleLayoutComponent} from './layouts/simple//simple-layout.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SimpleDualLayoutComponent } from './layouts/simple/simple-dual.component';
import { SimpleLayoutEditComponent } from './layouts/simple/edit.component';
import { SimpleDualLayoutEditComponent } from './layouts/simple/edit-dual.component';

const simpleFormDeclarations = [
  SimpleFormElementComponent, 
  SimpleLayoutComponent, 
  SimpleDualLayoutComponent,
  SimpleLayoutEditComponent,
  SimpleDualLayoutEditComponent
];

@NgModule({
  declarations: [simpleFormDeclarations],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgSelectModule,
    AngularEditorModule
  ],
  exports: [simpleFormDeclarations]
})
export class GenericFormModule { }
