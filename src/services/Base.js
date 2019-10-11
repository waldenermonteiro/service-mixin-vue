import { http } from '@/http-utils/Http'
import { responseService } from './responseService'
export default class Base {
  constructor (api) {
    this.api = api
    this.http = http
    this.responseService = responseService
  }
  list = async () => {
    try {
      const response = await this.http.get(this.api)
      return response
    } catch (error) {
      throw this.responseService(error, 'list')
    }
  }
  show = async ($id) => {
    try {
      const response = await this.http.get(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw this.responseService(error, 'get', 'item')
    }
  }

  create = async ($data) => {
    try {
      const response = await this.http.post(this.api, $data)
      return response.data
    } catch (error) {
      throw this.responseService(error, 'create')
    }
  }

  update = async ($data) => {
    try {
      const response = await this.http.put(`${this.api}/${$data.id}`, $data)
      return response.data
    } catch (error) {
      throw this.responseService(error, 'update')
    }
  }

  remove = async ($id) => {
    try {
      const response = await this.http.delete(`${this.api}/${$id}`)
      return response.data
    } catch (error) {
      throw this.responseService(error, 'remove')
    }
  }
}
