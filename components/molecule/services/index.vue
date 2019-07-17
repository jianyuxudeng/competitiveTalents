<template>
  <section :class="className" class="services_page">
      <ul>
          <li v-for="(item, index) in list" :key="index">
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
      return{}
  },
  mounted() {
  },
  methods: {
  }
};
</script>