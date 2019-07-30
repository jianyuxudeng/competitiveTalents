<template>
    <div class="navgation">
      <div class="head_flex">
        <!-- logo -->
        <div class="head_logo">
          <em><img src="../../assets/images/LOGO.png" alt=""></em>
          <a @click="goHome">首页</a>
          <a>行业资讯</a>
          <a>企业用户登录</a>
        </div>
        <!-- nav -->
        <div class="head_nav">
          <a v-for="item in navs" :key="item.code" @click="navLink(item.code)">{{item.name}}</a>
        </div>
      </div>
    </div>
</template>

<script>
import "./index.less";
import axios from "axios";
export default {
  name: "navgation",
  data() {
    return {
      navs: [
        {
          name: '职位发布',
          code: 'job-release'
        },
        {
          name: '搜索职位',
          code: 'search-positions'
        },
        {
          name: '简历搜索',
          code: 'resume-manage'
        },
        {
          name: '收件管理',
          code: 'mailbox'
        },
        {
          name: '求职者登录',
          code: 'login'
        }
      ]
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
  props: {
    
  },
  methods: {
    //导航路由跳转
    navLink(code) {
      this.$router.push({
        path: '/' + code
      })
    },
    //首页
    goHome() {
      this.$router.push({
        path: '/'
      })
    }
  },
  components: {}
};
</script>
