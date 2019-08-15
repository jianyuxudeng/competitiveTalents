<template>
  <section :class="className" class="services_page">
      <ul>
          <li v-for="(item, index) in servicesList" :key="index" @click="handleClick(item)">
              <dl>
                  <dt><img :src="item.img"></dt>
                  <dd>{{item.text}}</dd>
              </dl>
              <em></em>
          </li>
      </ul>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "services",
  props: ['className', 'list'],
  async asyncData(){
     return{

     }
  },
  data() {
      return{
          servicesList: []
      }
  },
  watch: {
      list() {
          this.init();
      }
  },
  mounted() {
      this.init();
  },
  methods: {
      init() {
          this.servicesList = this.list;
      },
      handleClick(e) {
          this.$emit('servicesItem', e);
      }
  }
};
</script>