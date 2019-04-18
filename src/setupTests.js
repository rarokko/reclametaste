import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as firebase from 'firebase';
configure({ adapter: new Adapter() });