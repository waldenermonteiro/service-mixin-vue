import Base from '@/services/Base'
class PostService extends Base {
  constructor() {
    super('/posts')
  }
}
export default new PostService()
