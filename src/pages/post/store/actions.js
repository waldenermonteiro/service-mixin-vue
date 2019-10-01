import PostServiceClass from '../services/PostService'
const PostService = new PostServiceClass()
const list = ({ commit }) => {
    return new Promise((resolve, reject) => {
        PostService.list().then((response) => {
            commit('LIST', response.data)
            resolve()
        }).catch((errors) => {
            reject(errors)
        })
    })
}
export default {
    list
}
