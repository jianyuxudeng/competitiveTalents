<template>
    <div class="mobile_navgation">
      <div class="head_flex">
        <!-- logo -->
        <div class="head_logo">
          <em><img src="../../../assets/images/LOGO.png" alt=""></em>
        </div>
        <!-- nav -->
        <div class="head_nav">
          <a v-if="!isLogin" @click="gotoLogin">注册/登录</a>
          <a v-else>
              <span>{{username}}</span>
              <em><a-icon :type="isSelect ? 'caret-up' : 'caret-down'" /></em>
              <a-menu
                mode="inline"
                theme="dark"
              >
                <a-menu-item>个人信息</a-menu-item>
                <a-menu-item>退出登录</a-menu-item>
              </a-menu>
          </a>
          <div class="san" :class="{cur: isMune}" @click="isMune = !isMune">
              <span></span>
              <span></span>
              <span></span>
          </div>
          <a-menu 
              class="nav_menu"
              v-if="isMune"
              mode="inline"
              theme="dark"
          >
              <a-menu-item v-for="item in navs" :key="item.code" @click="navLink(item.code)">
                  {{item.name}}
              </a-menu-item>
          </a-menu>
          <!-- <a @click="goHome">首页</a> -->
          <!-- <a v-for="item in navs" :key="item.code">
            <span @click="navLink(item.code)">{{item.name}}</span>
            <em v-if="isLogin && item.code=='logout'"><a-icon :type="isSelect ? 'caret-up' : 'caret-down'" /></em>
            <ul v-if="isSelect && item.code=='logout'">
              <li @click="goResumeDetail">个人信息</li>
              <li @click="goLodout">退出登录</li>
            </ul>
          </a> -->
        </div>
      </div>
    </div>
</template>

<script>
import "./index.less";
import ajax from "../../../plugins/api";
import util from '../../../plugins/utils/util';
export default {
  name: "mobile-navgation",
  data() {
    return {
      navs: [],
      isLogin: false,
      isSelect: false,
      isMune: false,
      username: null
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
        this.username = userInfo.username;
        _isLogin = true;
        switch (userInfo.type) {
          case 2:
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
              }
            ];
            break;
          case 3: 
            _navs = [
              {
                name: '职位发布',
                code: 'job-release'
              },
              {
                name: '职位管理',
                code: 'resume-manage'
              },
              {
                name: '收件箱',
                code: 'mailbox'
              },
              {
                name: '企业信息',
                code: 'company-info'
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
    goResumeDetail() {
        if(util.getStore('userInfo').type == 2) {
            this.$router.push({
                path: 'resume-detail'
            });
        }else{
            this.$router.push({
                path: 'company-info'
            })
        };
        this.isSelect = false;
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
