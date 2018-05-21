import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import 'hammerjs';

const $ = require('jquery');

global.$ = $;
$.prototype.modal = () => {};

configure({ adapter: new Adapter() });
