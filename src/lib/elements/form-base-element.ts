import { ValidatorFn } from '@angular/forms';
import { Subject, Observable } from 'rxjs';

export class FormBaseElement<T> {
  value: T;
  key: string;
  label: string;
  required?: boolean = false;
  order?: number = 1;
  controlType?: string;
  fieldType?: string;
  placeHolder?: string;
  helpText?: string;
  errors?: Array<string>;
  defaultValue?: any;
  validators?: ValidatorFn[];
  
  private _valueChanges: Subject<T> = new Subject<T>();

  constructor(options: {
    value?: T,
    key?: string,
    label?: string,
    required?: boolean,
    order?: number,
    controlType?: string,
    fieldType?: string,
    placeHolder?: string,
    helpText?: string,
    defaultValue?: any,
    validators?: ValidatorFn[]
  } = {}) {
    this.value = options.value;
    this.defaultValue = options.defaultValue;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.fieldType = options.fieldType;
    this.placeHolder = options.placeHolder || '';
    this.helpText = options.helpText;
    this.errors = [];
    this.validators = options.validators || [];
  }

  public setValue(val: any) {
    this._valueChanges.next(val);
  }

  get valueChanges(): Observable<T> {
    return this._valueChanges.asObservable();
  }
}
