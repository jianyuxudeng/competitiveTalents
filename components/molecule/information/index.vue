<template>
  <section class="information_page">
      <!-- 标题 -->
      <div class="title">{{title}}</div>
      <!-- 列表 -->
      <a-list
          class="demo-loadmore-list"
          itemLayout="horizontal"
          :dataSource="list"
      >
          <a-list-item slot="renderItem" slot-scope="item" @click="informationItem(item)">
              <a-list-item-meta :description="item.title"></a-list-item-meta>
              <span>{{item.create_time}}</span>
          </a-list-item>
      </a-list>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "information",
  props: ['list', 'title'],
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
      informationItem(item) {
          this.$emit('goIndustryDetail', item)
      }
  }
};
</script>