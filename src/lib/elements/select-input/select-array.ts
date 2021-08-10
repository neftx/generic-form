import {FormBaseElement} from '../form-base-element';

interface ISelect {
  displayName: string;
  value: any;
}

export class SelectArray extends FormBaseElement<string> {
  controlType = 'select-array';
  type: 'string';

  public values: Array<ISelect>; // Both display and value are same.

  constructor(options: {}, values: Array<any>= []) {
    super(options);
    this.type = options['type'] || '';
    this.values = values;
  }
}
