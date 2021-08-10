export interface INgSelect {
  options?: Array<any>;
  tag?: boolean;
  searchable?: boolean;
  async?: boolean;
  asyncSubscriber?: Function;
  keyValue?: Array<string>;
  multiple?: boolean;
  filter?: object;
}
