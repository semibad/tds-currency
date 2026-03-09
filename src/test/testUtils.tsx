import ConverterApp from '../ConverterApp';
import { Provider } from 'react-redux';
import store from '../state/store';

const AppWithStore = () => (<Provider store={store}><ConverterApp /></Provider>);

export { AppWithStore };
