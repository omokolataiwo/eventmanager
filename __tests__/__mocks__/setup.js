import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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

configure({ adapter: new Adapter() });
