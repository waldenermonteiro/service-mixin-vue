import Api from '@/services/Api'
// import { ResponseService } from '@/service/ResponseService'
export default class PostService extends Api {
  constructor () {
    super('/posts')
  }
}
