import PostService from '../services/PostService'
const list = async ({ commit }) => {
    const response = await PostService.list()
    commit('LIST', response.data)
}
export default {
    list
}
