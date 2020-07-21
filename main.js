import Vue from 'vue'
import App from './App'

import VueClipboard from 'vue-clipboard2'							// 点击复制组件

import pageHead from './components/page-head.vue'
import pageFoot from './components/page-foot.vue'
import uLink from '@/components/uLink.vue'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$backgroundAudioData = {
	playing: false,
	playTime: 0,
	formatedPlayTime: '00:00:00'
}
Vue.prototype.$adpid = "1111111111"

Vue.component('page-head', pageHead)
Vue.component('page-foot', pageFoot)
Vue.component('uLink', uLink)
Vue.use(VueClipboard)												// 插入复制组件

App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
