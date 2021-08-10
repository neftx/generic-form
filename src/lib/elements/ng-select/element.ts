import {FormBaseElement} from '../form-base-element';
import {INgSelect} from './select-interface';

export class NgSelectElement extends FormBaseElement<any> {
  controlType = 'ng-select';
  type: string;
  public selectOptions: INgSelect;
  public keyName: string;
  public currentValue: string;

  constructor(options: {} = {}, selectOptions: INgSelect = {}) {
    super(options);
    this.type = options['type'] || '';
    this.selectOptions = selectOptions;
    this.keyName = options['keyName'] ? options['keyName'] : 'name';
    this.currentValue = options['currentValue'] ? options['currentValue'] : null;
  }
}
