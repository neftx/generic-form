import {FormBaseElement} from '../form-base-element';

export class HiddenElement extends FormBaseElement<any> {
  controlType = 'hidden';
  type: any;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
