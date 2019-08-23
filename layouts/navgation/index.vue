<template>
    <div class="navgation">
      <div class="head_flex">
        <!-- logo -->
        <div class="head_logo">
        </div>
        <!-- nav -->
        <div class="head_nav">
          <a @click="goHome">首页</a>
          <a v-for="item in navs" :key="item.code">
            <span @click="navLink(item.code)">{{item.name}}</span>
            <em v-if="isLogin && item.code=='logout'"><a-icon :type="isSelect ? 'caret-up' : 'caret-down'" /></em>
            <ul v-if="isSelect && item.code=='logout'">
              <li @click="goResumeDetail">个人信息</li>
              <li @click="goSettings">账号设置</li>
              <li @click="goLodout">切换为招聘者</li>
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
            },
            {
              name: '用户登录',
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
    goSettings() {
      this.$router.push({
        path: '/settings'
      });
      this.isSelect = false;
    },
    goLodout() { //退出登录
      ajax.get('layout').then(res => {
        util.setStore('userInfo', null)
        this.init();
        this.$router.push({
          path: '/login'
        })
      })
    }
  }
};
</script>
