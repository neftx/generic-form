import { ChangeDetectorRef, Component,OnInit } from '@angular/core';
import { FormBaseService } from '../../generic-form.service';
import { SimpleLayoutComponent } from './simple-layout.component';

@Component({
  selector: 'simple-form-dual-layout',
  templateUrl: './simple-dual.component.html',
  providers: [ FormBaseService ]
})
export class SimpleDualLayoutComponent extends SimpleLayoutComponent implements OnInit {

  constructor(formBase: FormBaseService, cdr: ChangeDetectorRef) { 
    super(formBase, cdr);
  }

  ngOnInit() {
   super.ngOnInit();
  }
}
