import {FormBaseElement} from '../form-base-element';

export class NumberElement extends FormBaseElement<number> {
  controlType = 'number';
  type: number;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
