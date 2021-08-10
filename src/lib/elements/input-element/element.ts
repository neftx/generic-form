import {FormBaseElement} from '../form-base-element';

export class InputElement extends FormBaseElement<string> {
  controlType = 'string';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
