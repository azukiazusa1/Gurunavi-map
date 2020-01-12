import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster' // replace src with dist if you have Babel issues

Vue.config.productionTip = false
Vue.prototype.$url = "https://api.gnavi.co.jp/RestSearchAPI/v3/"
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAP_API_KEY,
    libraries: 'places',
  },
  // クリック以外のイベントを取得
  autobindAllEvents: false,
})

Vue.component('GmapCluster', GmapCluster)

new Vue({
  render: h => h(App),
}).$mount('#app')
