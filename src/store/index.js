import Vue from 'vue'
import Vuex from 'vuex'
import Posts from '../components/store'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Posts
    }
  })

  return Store
}
