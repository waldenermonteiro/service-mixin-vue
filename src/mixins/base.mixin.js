import notifyMessage from './notify-message.mixin'
export default {
  mixins: [notifyMessage],
  methods: {
    async login(params) {
      //loadingShow
      try {
        await this.$store.dispatch(params.urlDispatch, params.params)
        if (params.callback) {
          params.callback()
        }
      } catch (errors) {
        this.setNotifyDanger(errors)
      } finally { /*loadingHide */ }
    },
    async list(params) {
      //loading
      try {
        await this.$store.dispatch(params.urlDispatch)
        if (params.callback) {
          params.callback()
        }
      } catch (errors) {
        this.setNotifyDanger(errors)
      } finally { /*loadingHide */ }
    },
    async listFilter(params) {
      //loading
      try {
        await this.$store.dispatch(params.urlDispatch, params.params)
        if (params.callback) {
          params.callback()
        }
      } catch (errors) {
        this.setNotifyDanger(errors)
      } finally { /*loadingHide */ }
    },
    async createOrUpdate(params) {
      //loading
      try {
        await this.$store.dispatch(params.urlDispatch, params.params)
        this.setNotifySuccess(params.messages)
        if (params.callback) {
          params.callback()
        }
      } catch (errors) {
        this.setNotifyDanger(errors)
      } finally { /*loadingHide */ }
    }
  }
}
