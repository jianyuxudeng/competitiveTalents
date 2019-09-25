<template>
  <section>
      <div class="tidings">
          <div class="table">
              <p v-for="(item, index) in list" :key="index" :class="{read: item.isRead}">
                  <span>收到{{item.name}}的一份简历投递</span>
                  <span>{{item.times}}</span>
              </p>
          </div>
          <a-pagination showQuickJumper :total="list.length" />
      </div>
  </section>
</template>

<script>
import "./index.less";

export default {
  data() {
      return{
          list: [
              {
                  name: '某某',
                  times: '2019.06.28 18:30',
                  isRead: false
              },
              {
                  name: '某某',
                  times: '2019.06.28 18:30',
                  isRead: false
              },
              {
                  name: '某某某',
                  times: '2019.06.28 18:30',
                  isRead: true
              }
          ]
      }
  },
  mounted() {
  },
  methods: {
  }
};
</script>