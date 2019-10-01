export default {
  methods: {
    setNotifyDanger(message) {
      const uniqueMessage = message.message || message
      if (Array.isArray(message)) {
        this.setMultipleNotifyDanger(message)
      } else {
        this.setUniqueNotifyDanger(uniqueMessage)
      }
    },
    setUniqueNotifyDanger(message) {
      alert("ERRO: " + message)
    },
    setMultipleNotifyDanger(messages) {
      messages.forEach(message => {
        this.setUniqueNotifyDanger(message.errorMessage)
      })
    },
    setNotifySuccess(message) {
      alert("SUCCESS: " + message)
    }
  }

}
