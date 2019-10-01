import notifyMessage from './notify-message.mixin'
export default {
  mixins: [notifyMessage],
  methods: {
    list(urlDispatch) {
      //loading.show
      this.$store.dispatch(urlDispatch).catch((errors) => {
        this.setNotifyDanger(errors)
      }).finally(() => console.log('finally')) //loading.hide
    },
    listFilter(urlDispatch, params) {
      //loading.show
      this.$store.dispatch(urlDispatch, params).catch((errors) => {
        this.setNotifyDanger(errors)
      }).finally(() => console.log('finally')) //loading.hide
    },
    create(params) {
      //loading.show
      this.$store.dispatch(params.urlDispatch, params.param).then(() => {
        this.setNotifySuccess(params.messageSuccess)
        params.callback()
      }).catch((errors) => {
        this.setNotifyDanger(errors)
      }).finally(() => console.log('finally')) //loading.hide
    }
  }
}
