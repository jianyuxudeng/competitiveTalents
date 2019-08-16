<template>
  <section class="industry_detail page_centent">
      <div class="nav-bg"></div>
      <div class="centent">
          <div v-html="content"></div>
      </div>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "industry-detail",
  async asyncData(){
     return{
     };
  },
  data() {
      return{
          content: null
      }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
      init() {
          this.content = this.$route.query.content;
      }
  }
};
</script>