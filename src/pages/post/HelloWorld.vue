<template>
  <div class="hello">
    <h1>Post com serviços lindos</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,
      <br />check out the
      <a
        href="https://cli.vuejs.org"
        target="_blank"
        rel="noopener"
      >vue-cli documentation</a>.
    </p>
    <h1>Lista de posts retornados da api fakezona</h1>
    <ul :key="index" v-for="(post, index) in posts">
      <li>{{post.name}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";
import base from "@/mixins/base.mixin";
export default {
  name: "HelloWorld",
  mixins: [base],
  data: () => ({}),
  mounted() {
    this.list({ urlDispatch: "Post/list" });
  },
  computed: {
    ...mapState("Post", ["posts"])
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
