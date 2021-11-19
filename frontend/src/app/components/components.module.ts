import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { NavComponent } from './nav/nav.component';
import { MaterialModule } from '../shared/material/material.module'
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    SpinnerComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ], exports: [SpinnerComponent, NavComponent]
})
export class ComponentsModule { }
