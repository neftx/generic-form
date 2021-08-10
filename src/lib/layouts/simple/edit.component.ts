import { ChangeDetectorRef, Component,Input,OnInit } from '@angular/core';
import { FormBaseService } from '../../generic-form.service';
import { SimpleLayoutComponent } from './simple-layout.component';
import {Observable} from 'rxjs';
@Component({
  selector: 'simple-layout-edit',
  templateUrl: './simple-layout.component.html',
  providers: [ FormBaseService ]
})
export class SimpleLayoutEditComponent extends SimpleLayoutComponent implements OnInit {

  @Input() getObservable: Observable<any>;
  @Input() async: boolean = false;
  @Input() data: any = {};
  @Input() layout = "default";

  constructor(formBase: FormBaseService, cdr: ChangeDetectorRef) { 
    super(formBase, cdr);
  }

  ngOnInit() {
    super.ngOnInit();
    this.loading =  true;
    if(this.async) {
      this.getObservable.subscribe(data => {
        if(data) {
          this.form.patchValue(data);
          this.setValues(data);
        }
      })

    } else {
      this.form.patchValue(this.data);
      this.setValues(this.data);
    }
    this.loading = false;
  }
}