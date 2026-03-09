import { createRoot } from 'react-dom/client';
import ConverterApp from './ConverterApp.tsx';
import { Provider } from 'react-redux';
import store from './state/store.ts';

import './index.scss';

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<ConverterApp />
	</Provider>
);
