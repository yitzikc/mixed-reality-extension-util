import { castArray, last } from 'lodash';
import { ParameterSet, Color3, Color4 } from '@microsoft/mixed-reality-extension-sdk';

const toBoolean = require('to-boolean') as (_: any) => boolean; // tslint:disable-line

// Get the last of potentially multiple values of a parameter in an MRE parameter set
export function getParameterLastValue(params: ParameterSet, name: string, dflValue: string = ''): string {
  return last(castArray(params[name] ?? dflValue)) as string;
}

// Get all the values of a parameter in an MRE parameter set
export function getParameterAllValues(params: ParameterSet, name: string): string[] {
  return castArray(params[name] ?? []);
}

// Get the value of a boolean parameter whose value can be 'y' or 'n'
export function getBooleanOption(params: ParameterSet, name: string, dfl = false): boolean {
  const assumeIfNotGiven = dfl ? 'y' : 'n';
  const textValue = getParameterLastValue(params, name, assumeIfNotGiven).trim() || assumeIfNotGiven;
  return toBoolean(textValue);
}

// Get a 3 or 4-channel colour from an option
export function getColorOption(params: ParameterSet, name: string, dfl: Color3 | Color4): Color3 | Color4 {
  const colorSpec = '#' + getParameterLastValue(params, name, '').replace('#', ' ').trim();
  switch (colorSpec.length) {
    case 7:
      return Color3.FromHexString(colorSpec);
    case 9:
      return Color4.FromHexString(colorSpec);
    case 1:
      return dfl;
    default:
      // FIXME: Throw a specific error class.
      throw Error(`Invalid HEX color: ${colorSpec}`);
  }
}
