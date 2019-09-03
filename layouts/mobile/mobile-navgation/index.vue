<template>
    <div class="mobile_navgation">
      <div class="head_flex">
        <!-- logo -->
        <div class="head_logo">
        </div>
        <!-- nav -->
        <div class="head_nav">
          <a v-if="!isLogin" @click="gotoLogin">注册/登录</a>
          <a v-else>
              <span @click="isSelect = !isSelect; isMune = false">{{username}}</span>
              <em><a-icon :type="isSelect ? 'caret-up' : 'caret-down'" /></em>
              <a-menu
                mode="inline"
                theme="dark"
                v-if="isSelect"
              >
                <a-menu-item @click="goResumeDetail">{{userInfo.type == 2 ? '个人信息' : '企业信息'}}</a-menu-item>
                <a-menu-item @click="navLink('settings')" v-if="userInfo.type == 2">账号设置</a-menu-item>
                <a-menu-item @click="goLodout" v-if="userInfo.type == 2">切换为招聘者</a-menu-item>
                <a-menu-item @click="goLodout">退出登录</a-menu-item>
              </a-menu>
          </a>
          <div class="san" :class="{cur: isMune}" @click="isMune = !isMune; isSelect = false">
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
      username: null,
      userInfo: null
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
        ajax.get('user/' + userInfo.id).then(res => {
          if(res.retcode == 0) {
            this.username = res.data.name || res.data.username;
          }
        });
        _isLogin = true;
        switch (userInfo.type) {
          case 2:
            _navs = [
              {
                name: '首页',
                code: ''
              },
              {
                name: '我的简历',
                code: 'resume-detail'
              },
              {
                name: '投递情况',
                code: 'delivery-status'
              },
              {
                name: '职位收藏',
                code: 'job-collection'
              }
            ];
            break;
          case 3: 
            _navs = [
              {
                name: '首页',
                code: ''
              },
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
              name: '首页',
              code: ''
            },
            {
              name: '我的简历',
              code: 'resume-detail'
            },
            {
              name: '投递情况',
              code: 'delivery-status'
            },
            {
              name: '职位收藏',
              code: 'job-collection'
            }
          ];
      };
      this.navs = _navs;
      this.isLogin = _isLogin;
      this.userInfo = userInfo;
    },
    //导航路由跳转
    navLink(code) {
      let userInfo = util.getStore('userInfo');
      if(userInfo) {
        if(code != 'logout') {
          this.$router.push({
            path: '/mobile/' + code
          })
        }else{
          this.isSelect = !this.isSelect;
        }
      }else{
        this.$router.push({
          path: '/mobile/login'
        })
      };
      this.isMune = false;
      this.isSelect = false;
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
        path: '/mobile/'
      })
    },
    goLodout() { //退出登录
      ajax.get('layout').then(res => {
        util.setStore('userInfo', null)
        this.init();
        this.$router.push({
          path: '/mobile/login'
        })
      })
    },
    gotoLogin() {
      this.$router.push({
        path: '/mobile/login'
      })
    }
  }
};
</script>
