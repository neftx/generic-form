import {
  InputElement,
  NumberElement,
  BooleanElement,
  SelectArray,
  HiddenElement,
  TextElement,
  DateElement,
  DisplayElement, PasswordElement , SmartTextElement} from '../lib/elements';

export type IReactiveFields<T> = {
  [P in keyof T] : InputElement |
                    NumberElement |
                    BooleanElement |
                    SelectArray |
                    HiddenElement |
                    TextElement |
                    DateElement |
                    DisplayElement |
                    PasswordElement |
                    SmartTextElement;
};
