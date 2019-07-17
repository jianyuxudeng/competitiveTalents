<template>
  <section class="page_title">
      <span>{{title}}</span>
      <p>{{titleEn}}</p>
  </section>
</template>

<script>
import "./page-title.less";

export default {
  name: "page-title",
  props: ['title', 'titleEn'],
  async asyncData(){
     return{

     }
  },
  data() {
      return{}
  },
  mounted() {
  },
  methods: {
  }
};
</script>