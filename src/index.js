import XyzAlpha from './components/xyz-alpha/XyzAlpha.vue';
import XyzBeta from './components/xyz-beta/XyzBeta.vue';

const components = [
  XyzAlpha,
  XyzBeta
];

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  });

};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export default  {
  version: '0.0.3',
  install
};
