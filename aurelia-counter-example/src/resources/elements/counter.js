import { bindable } from "aurelia-framework";

export class Counter {
  @bindable count;

  constructor() {
    this.count;
  }

  countChanged(newValue, oldValue) {
    this.count = newValue;
  }

  onIncrement = () => {
    this.count += 1;
  };

  onDecrement = () => {
    this.count -= 1;
  };
}
