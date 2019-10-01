import Vue from 'vue'
import Vuex from 'vuex'
import Post from '@/pages/post/store'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      Post
    }
  })

  return Store
}
