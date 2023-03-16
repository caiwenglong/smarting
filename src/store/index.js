import { createPinia } from 'pinia';

const store = createPinia();

export default store;

export * from './modules/getIndexData';
export * from './modules/currentRoutePath';
