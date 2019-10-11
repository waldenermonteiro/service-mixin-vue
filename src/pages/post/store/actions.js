import PostServiceClass from '../services/PostService'
const PostService = new PostServiceClass()
const list = async ({ commit }) => {
    try {
        const response = await PostService.list()
        commit('LIST', response.data)
    } catch (errors) {
        throw errors
    }
}

export default {
    list
}
