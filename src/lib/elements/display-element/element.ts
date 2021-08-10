import {FormBaseElement} from '../form-base-element';

export class DisplayElement extends FormBaseElement<string> {
  controlType = 'display';
  type: any;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
