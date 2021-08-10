import {FormBaseElement} from '../form-base-element';

export class SmartTextElement extends FormBaseElement<string> {
  controlType = 'smart-text';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
