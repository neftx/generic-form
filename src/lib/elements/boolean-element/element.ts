import {FormBaseElement} from '../form-base-element';

export class BooleanElement extends FormBaseElement<boolean> {
  controlType = 'boolean';
  type: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.defaultValue = (this.defaultValue === 'false' || this.defaultValue == null) ? false : true;
    this.value = (options['value'] === 'false' || options['value'] == null || options['value'] === false)  ? false : true;
    this.type = options['type'] || '';
  }
}
