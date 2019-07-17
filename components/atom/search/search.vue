<template>
  <section :class="className">
      <a-input-search
          :placeholder="placeholder"
          @search="onSearch"
      />
  </section>
</template>

<script>
import "./search.less";

export default {
  name: "search",
  props: ['className', 'placeholder'],
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
    onSearch (value) {
        this.$emit('searchHandle', value);
    }
  }
};
</script>