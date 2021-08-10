import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormBaseElement } from '../../elements/form-base-element';
import { INgSelect } from '../../elements/ng-select/select-interface';
import { Subject, Subscription } from 'rxjs';
@Component({
  selector: 'form-element',
  templateUrl: './simple-form-element.component.html'
})

export class SimpleFormElementComponent implements OnInit, OnDestroy {
  @Input() element: FormBaseElement<any>;
  @Input() form: FormGroup;
  @Input() label: boolean = true;
  @Input() validators = [];
  @Input() labelType: string = 'left';
  public loading = true;

  // For ng-select
  public options: Array<any> = [];
  public multiple: boolean;
  public searchable: boolean;
  public async$: Function;
  public onSearch$: Subject<string> = new Subject<string>();
  public async = false;
  public addTag = false;
  private subscription: Subscription;
  private valueChangeSubscription: Subscription;
  private _elementValueChangeSubscription: Subscription;
  private loadBackend = false;
  public defaultOption = {};
  private filter: object = {};
  @Output() onValueChange = new EventEmitter<any>();
  constructor(private changedetectionref: ChangeDetectorRef){}
  get isValid() { return this.form.controls[this.element.key].valid; }

  ngOnInit() {
    this.loading = false;
    this.emitChanges();

    if (this.element.controlType === 'ng-select') {
      if (this.element.value) {
        this.defaultOption = { name: this.element['currentValue'], id: this.element.value };
      }
      const selectOptions: INgSelect = this.element['selectOptions'];
      if (selectOptions.async) {
        this.filter = selectOptions.filter || null;
        this.async = true;
        this.async$ = selectOptions.asyncSubscriber;
        this.initSearch();
      } else {
        this.options = selectOptions.options;
        this.searchable = selectOptions.searchable;
      }
      this.addTag = selectOptions.tag;
      this.multiple = selectOptions.multiple;
    }
    //Select array set first value as default
    if (this.element.controlType == 'select-array') {
      if (this.form.controls[this.element.key].value === '' || this.form.controls[this.element.key].value === null) {
        this.form.controls[this.element.key].setValue(this.element['values'][0].value, { onlySelf: true })
      }
    }
    if (this.validators.length != 0) {
      this.form.controls[this.element.key].setValidators(this.validators);
    }
  }
  getValidation(key) {
    if (this.form.controls[key].touched && (this.form.controls[key].errors?.required || this.form.controls[key].hasError('minlength') || this.form.controls[key].errors?.pattern || this.form.controls[key].errors?.min || this.form.controls[key].errors?.max)) {
      return true;
    } else {
      return false;
    }
  }
  private initSearch() {
    this.setSearch();
    this.onSearch$.subscribe((search) => {
      this.setSearch(search);
    }, err => { });
  }

  private setSearch(searchStr = '') {
    if (searchStr && searchStr != '') {
      this.loadBackend = true;
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.async$(searchStr, this.filter).subscribe((data) => {
        this.loadBackend = false;
        this.options = [...data];
        this.setDefault();
        this.changedetectionref.detectChanges();
      });
    }

  }

  onChange(data) {
    // For Ng Select emit the full item.
    const emitValue = { fullItem: {} };
    emitValue['fullItem'][this.element.key] = data;
    this.onValueChange.emit(emitValue);
  }

  private emitChanges() {
    if (this.element.controlType != "display") {
      this.valueChangeSubscription = this.form.controls[this.element.key].valueChanges.subscribe(changedValue => {
        const emitValue = {};
        emitValue[this.element.key] = changedValue;
        this.onValueChange.emit(emitValue);
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.valueChangeSubscription) {
      this.valueChangeSubscription.unsubscribe();
    }
    if (this._elementValueChangeSubscription) {
      this._elementValueChangeSubscription.unsubscribe();
    }
  }

  private setDefault() {
    const id = this.defaultOption['id'];
    if (id) {
      const checkOption = this.checkOption(id);
      if (!checkOption) {
        this.options = [this.defaultOption, ...this.options];
      }
    }
  }

  private checkOption(id: string) {
    let flag = false;
    this.options.forEach(opt => {
      if (opt['id'] === id) {
        flag = true;
      }
    });
    return flag;
  }
}
