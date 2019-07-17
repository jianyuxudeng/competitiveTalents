<template>
    <div class="navgation">
      <div class="head_flex">
        <!-- logo -->
        <div class="head_logo">
          <em><img src="../../assets/images/LOGO.png" alt=""></em>
          <a @click="goHome">首页</a>
          <a>行业资讯</a>
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
          code: '1'
        },
        {
          name: '职位管理',
          code: '2'
        },
        {
          name: '简历搜索',
          code: '3'
        },
        {
          name: '收件箱',
          code: '4'
        },
        {
          name: '企业信息',
          code: '5'
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
      console.log(code)
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
