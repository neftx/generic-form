import {FormBaseElement} from '../form-base-element';

export class TextElement extends FormBaseElement<string> {
  controlType = 'text';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
  }
}
