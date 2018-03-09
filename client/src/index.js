import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import 'materialize-css/dist/css/materialize.min.css';
import configureStore from './store/init';
import App from './App';
import Admin from './components/admin/Admin';
import User from './components/user/User';
import registerServiceWorker from './registerServiceWorker';
import './css/style.css';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/user" component={User} />
          <Route path="/" component={App} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
