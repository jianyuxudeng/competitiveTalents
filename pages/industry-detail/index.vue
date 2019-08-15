<template>
  <section class="industry_detail">
      <div>
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