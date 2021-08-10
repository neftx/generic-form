// Refactor this file.
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBaseElement } from './elements/form-base-element';
import { IReactiveFields } from './reactive.interface';

@Injectable({
  providedIn: 'root'
})

export class FormBaseService {
  constructor() { }

  toFormGroup(elements: FormBaseElement<any>[] ) {
    const group: any = {};

    elements.forEach(element => {
      if (element.controlType !== 'display') {
        const value = (element.value != null) ? element.value : null;
        let validators = element.validators ? element.validators : []
        if(element.required) {
          validators.push(Validators.required)
        }

        group[element.key] = element.required ? new FormControl(value, validators)
                                              : new FormControl(value);
      }
    });
    return new FormGroup(group);
  }

  toFormGroupFromHash(elements: IReactiveFields<any> ) {
    const group: any = {};
    let inputs = Object.keys(elements);

    inputs.forEach(elem => {
      let element = elements[elem];
        const value = (element.value != null) ? element.value : null;
        let validators = element.validators ? element.validators : []
        if(element.required) {
          validators.push(Validators.required)
        }

        group[element.key] = element.required ? new FormControl(value, validators)
                                              : new FormControl(value);
    });
    return new FormGroup(group);
  }
}