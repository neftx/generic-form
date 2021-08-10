import {FormBaseElement} from '../form-base-element';

export class PasswordElement extends FormBaseElement<string> {
  controlType = 'encrypted';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
