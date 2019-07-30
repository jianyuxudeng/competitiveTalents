<template>
  <section class="mailbox">
      <div class="nav-bg"></div>
      <div class="centent">
          <a-tabs defaultActiveKey="1" @change="callbackTab">
              <a-tab-pane tab="按职位查看" key="1"></a-tab-pane>
              <a-tab-pane tab="关注职位" key="2"></a-tab-pane>
              <a-tab-pane tab="近半年简历" key="3"></a-tab-pane>
              <a-tab-pane tab="面试安排" key="4"></a-tab-pane>
          </a-tabs>
      </div>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "mailbox",
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
      callbackTab(key) {}
  }
};
</script>