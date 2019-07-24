<template>
    <section>
        <div class="nav-bg"></div>
        <a-tabs defaultActiveKey="1" tabPosition="left">
            <a-tab-pane tab="账号绑定" key="1">Content of Tab Pane 1</a-tab-pane>
            <a-tab-pane tab="隐私设置" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
            <a-tab-pane tab="修改密码" key="3">Content of Tab Pane 3</a-tab-pane>
        </a-tabs>
    </section>
</template>

<script>
import "./index.less";
export default {
  name: "settings",
  data() {
    return {
        active: '1'
    };
  },
  async asyncData() {
   
  },
  created() {
  
  },
  mounted() {
   
  },
  watch: {
   
  },
  methods: {
  },
  components: {}
};
</script>
