import Vue from 'vue'
import App from './App'
import router from './router'
import {Cell, CellGroup ,Tabbar,TabbarItem,PullRefresh,Stepper,Tab,Tabs,Button, Row, Col, Swipe, SwipeItem , Lazyload ,List ,Field, NavBar } from 'vant'

Vue.use(Cell).use(CellGroup).use(Tabbar).use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs).use(Field).use(NavBar).use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
