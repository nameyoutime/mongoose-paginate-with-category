import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule,NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { HttpClientModule } from '@angular/common/http'
const MaterialComponents = [
  NgbModule,
  NgbPaginationModule,
  HttpClientModule,
  NgbDropdownModule
]

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
