import {FormBaseElement} from '../form-base-element';

export class DateElement extends FormBaseElement<string> {
  controlType = 'date';
  type: string;
  dateType: string;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.dateType = options['dateType'] || 'date'
  }
}
