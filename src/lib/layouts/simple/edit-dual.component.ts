import { ChangeDetectorRef, Component,Input,OnInit } from '@angular/core';
import { FormBaseService } from '../../generic-form.service';
import {Observable} from 'rxjs';
import { SimpleLayoutEditComponent } from './edit.component';
@Component({
  selector: 'simple-dual-layout-edit',
  templateUrl: './simple-dual.component.html',
  providers: [ FormBaseService ]
})
export class SimpleDualLayoutEditComponent extends SimpleLayoutEditComponent implements OnInit {

  @Input() getObservable: Observable<any>;
  @Input() async: boolean = false;
  @Input() data: any = {};

  constructor(formBase: FormBaseService, cdr: ChangeDetectorRef) { 
    super(formBase, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
  }
}