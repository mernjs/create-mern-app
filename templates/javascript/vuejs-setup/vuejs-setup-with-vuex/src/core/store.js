import Vue from 'vue';
import Vuex from 'vuex';
import rootStore from '../store'
import createLogger from 'vuex/dist/logger';

const debug = process.env.NODE_ENV !== 'production';
const logger = debug ? [createLogger({collapsed: false})] : [];

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: rootStore,
  plugins: logger
});

export default store