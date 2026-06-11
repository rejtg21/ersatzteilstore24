import { Provider } from 'react-redux';
import store from '@config/store';
import AppRouter from './AppRouter';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
