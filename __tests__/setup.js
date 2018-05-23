import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'hammerjs';

const $ = require('jquery');

global.$ = $;
const storage = {};
global.localStorage = {
  setItem: (key, value) => {
    storage[key] = value;
  },
  getItem: key => storage[key],
  removeItem: (key) => {
    Reflect.deleteProperty(storage, key);
  }
};
$.prototype.modal = () => {};

configure({ adapter: new Adapter() });
