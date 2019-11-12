import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { BreadcrumbModel } from './breadcrumb.model'

@Component({
  selector: 'as-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {

  @Input('objeto') breadcrumb: BreadcrumbModel;

  constructor() {
  }

}

