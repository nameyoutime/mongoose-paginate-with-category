import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { MaterialModule } from '../../shared/material/material.module'
import { ComponentsModule } from '../../components/components.module'

@NgModule({
  declarations: [
    CategoryComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ComponentsModule,
    MaterialModule
  ]
})
export class CategoryModule { }
