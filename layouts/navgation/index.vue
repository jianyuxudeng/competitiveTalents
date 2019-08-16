<template>
    <div class="navgation">
      <div class="head_flex">
        <!-- logo -->
        <div class="head_logo">
          <em><img src="../../assets/images/LOGO.png" alt=""></em>
          <a @click="goHome">首页</a>
          <a>行业资讯</a>
          <a v-if="!isLogin" @click="gotoLogin">企业用户登录</a>
        </div>
        <!-- nav -->
        <div class="head_nav">
          <a v-for="item in navs" :key="item.code">
            <span @click="navLink(item.code)">{{item.name}}</span>
            <em v-if="isLogin && item.code=='logout'"><a-icon :type="isSelect ? 'caret-up' : 'caret-down'" /></em>
            <ul v-if="isSelect && item.code=='logout'">
              <li @click="goLodout">退出登录</li>
            </ul>
          </a>
        </div>
      </div>
    </div>
</template>

<script>
import "./index.less";
import ajax from "../../plugins/api";
import util from '../../plugins/utils/util';
export default {
  name: "navgation",
  data() {
    return {
      navs: [],
      isLogin: false,
      isSelect: false
    };
  },
  async asyncData() {
   
  },
  created() {
  
  },
  mounted() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
  },
  methods: {
    init() {
      let userInfo = util.getStore('userInfo');
      let _navs = [];
      let _isLogin = false;
      if(userInfo) {
        switch (userInfo.type) {
          case 2:
            _isLogin = true;
            _navs = [
              {
                name: '简历',
                code: 'resume-detail'
              },
              {
                name: '投递情况',
                code: 'delivery-status'
              },
              {
                name: '收藏夹',
                code: 'job-collection'
              },
              {
                name: '账号设置',
                code: 'settings'
              },
              {
                name: userInfo.username,
                code: 'logout'
              }
            ];
            break;
          case 3: 
            _isLogin = true;
            _navs = [
              {
                name: '职位发布',
                code: 'job-release'
              },
              {
                name: '职位管理',
                code: 'resume-manage'
              },
              // {
              //   name: '简历搜索',
              //   code: 'resume-manage'
              // },
              {
                name: '收件箱',
                code: 'mailbox'
              },
              {
                name: '企业信息',
                code: 'company-info'
              },
              {
                name: userInfo.username,
                code: 'logout'
              }
            ];
            break;
        
          default:
            break;
        }
      } else{
        _isLogin = false;
        _navs = [
            {
              name: '简历',
              code: 'resume-detail'
            },
            {
              name: '投递情况',
              code: 'delivery-status'
            },
            {
              name: '收藏夹',
              code: 'job-collection'
            },
            {
              name: '账号设置',
              code: 'company-info'
            },
            {
              name: '求职者登录',
              code: 'login'
            }
          ];
      };
      this.navs = _navs;
      this.isLogin = _isLogin;
    },
    //导航路由跳转
    navLink(code) {
      let userInfo = util.getStore('userInfo');
      if(userInfo) {
        if(code != 'logout') {
          this.$router.push({
            path: '/' + code
          })
        }else{
          this.isSelect = !this.isSelect;
        }
      }else{
        this.$router.push({
          path: '/login'
        })
      }
    },
    //首页
    goHome() {
      this.$router.push({
        path: '/'
      })
    },
    goLodout() { //退出登录
      ajax.get('layout').then(res => {
        util.setStore('userInfo', null)
        this.init();
        this.$router.push({
          path: '/login'
        })
      })
    },
    gotoLogin() {
      this.$router.push({
        path: '/login'
      })
    }
  }
};
</script>
