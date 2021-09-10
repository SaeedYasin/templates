import { PLATFORM } from "aurelia-pal";

export function configure(config) {
  config.globalResources([
    PLATFORM.moduleName("resources/value-converters/image-context"),
  ]);
}
