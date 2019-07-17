<template>
  <section class="page_title">
      <span>{{title}}</span>
      <p>{{titleEn}}</p>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "Title",
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