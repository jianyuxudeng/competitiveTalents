<template>
  <section class="industry_detail">
      <div>
          <div v-html="detail"></div>
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
          detail: null
      }
  },
  watch: {
  },
  mounted() {
  },
  methods: {
  }
};
</script>