import Vue from 'vue'
import App from './App.vue'
import VueApollo from "vue-apollo";
import ApolloClient from "apollo-client";
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from "apollo-cache-inmemory";

import { domain, clientId } from "../auth_config.json";
import { Auth0Plugin } from "./auth";


Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});
Vue.use(VueApollo);

const getHeaders = () => {
  const headers = {};
  const token = window.localStorage.getItem('apollo-token');
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }
  return headers;
};

import authConfig from "../auth_config.json";
const link = new WebSocketLink({
  uri: authConfig.wssEndpoint,
  options: {
    reconnect: true,
    timeout: 30000,
    connectionParams: () => {
      return { headers: getHeaders() };
    },
  }
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    loadingKey: 'loading',
    fetchPolicy: 'no-cache'
  }
});
const apolloProvider = new VueApollo({
  defaultClient: client,
})

import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import dateFilter from './filters/date.filter'
Vue.filter('datefilter', dateFilter)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
