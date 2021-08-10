import { Component, Input, EventEmitter, OnInit, Output, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FormBaseElement } from '../../elements/form-base-element';
import { FormBaseService } from '../../generic-form.service';

@Component({
  selector: 'simple-form-layout',
  templateUrl: './simple-layout.component.html',
  providers: [ FormBaseService ]
})
export class SimpleLayoutComponent implements OnInit, OnDestroy {

  @Input() elements: FormBaseElement<any>[] = [];
  @Input() elementsHash: any;
  @Input() title = 'New Form';
  @Input() id: string = null;
  @Input() label: boolean = true;
  @Input() labelType: string = 'left';
  @Input() layout: string = "default";

  @Input() saveService: Function;

  @Output() valueChanges = new EventEmitter<any>();

  public loading = false;

  form: FormGroup;
  
  @Output() onSubmitted = new EventEmitter<any>();
  @Output() submitErrors = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<boolean>();

  @Output() elementChanges = new EventEmitter<any>();

  private valueChangesSubscription: Subscription;

  public initSubmit = false;
  public formErrors: Array<string> = [];

  constructor(private formBase: FormBaseService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if(this.elementsHash !== undefined) {
      let elements = [];
      Object.keys(this.elementsHash).forEach(elem => {
        elements.push(this.elementsHash[elem]);
      });
      this.elements = elements;
    }
    this.elements = this.elements.sort((a, b) => a.order - b.order);
    this.setValues();
    this.form = this.formBase.toFormGroup(this.elements);
    this.emitValueChanges();
  }

  onSubmit() {
    this.initSubmit = true;
    this.formErrors = [];
    this.saveService(this.form.value).toPromise().then(data => {
      if(data["errors"].length > 0) {
        this.formErrors = data["errors"];
        this.submitErrors.emit(data["errors"]);

      } else {
        
        this.onSubmitted.emit(data);
      }
    }).catch((err:any) => {
      // Handle errors
      this.formErrors = ["Could not save record"];
      this.submitErrors.emit(err);
      
    }).finally(() => {
      this.initSubmit = false;
      this.cdr.detectChanges();
    })
  }
  cancelForm() {
    this.form.reset();
    this.onCancel.emit(true);
  }

  onElementValueChange(data) {
    this.elementChanges.emit(data);
  }

  emitValueChanges() {
    this.form.valueChanges.subscribe(changes => {
      this.valueChanges.emit(changes);
    })
  }

  ngOnDestroy() {
    if(this.valueChangesSubscription) {
      this.valueChangesSubscription.unsubscribe();
    }
  }

  setValues(data={}) {
    this.elements.forEach(elem => {
      if(elem.controlType == 'boolean') {
        elem.value = (data[elem.key] == undefined) ? elem.defaultValue : data[elem.key]
      } else {
        elem.value = data[elem.key];
      }
    });
  }


}
