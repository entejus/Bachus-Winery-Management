import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import apolloClient from './apolloClient';
import App from './App';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
