<template>
    <section class="settings page_centent">
        <div class="nav-bg"></div>
        <a-tabs defaultActiveKey="1" tabPosition="left">
            <!-- 账号绑定 -->
            <a-tab-pane tab="账号绑定" key="1">
              <div class="account">
                <div class="head">
                  <a-row type="flex" justify="start" align="middle">
                    <a-col :span="2">帐号</a-col>
                    <a-col :span="16" v-if="isInput"><a-input v-model="username" /></a-col>
                    <a-col :span="5" v-else>{{userInfo.username}}</a-col>
                    <a-col :span="4">
                      <a @click="handleInput(true)" v-if="isInput">确认</a>
                      <a @click="handleInput(false)" v-else>更换手机号</a>
                    </a-col>
                  </a-row>
                  <a-row type="flex" justify="start" align="middle" class="email">
                    <a-col :span="2">邮箱</a-col>
                    <a-col :span="5" v-if="isEmail">{{email}}</a-col>
                    <a-col :span="16" v-else><a-input v-model="email" /></a-col>
                    <a-col :span="4">
                      <a @click="isEmail = false" v-if="isEmail">修改邮箱</a>
                      <a @click="handleEmail" v-else>绑定邮箱</a>
                    </a-col>
                  </a-row>
                  <p>绑定后，你可以同时使用一下方式登录</p>
                </div>
                <!-- <div class="cent">
                  <p v-for="item in accounts" :key="item.type" :class="{active: item.isBinding}">
                    <a-icon :type="item.type" />
                    <span v-if="item.isBinding">已绑定{{item.typeName}}帐号： {{item.name}}</span>
                    <a>{{item.isBinding ? '解除绑定' : '绑定' + item.typeName + '帐号'}}</a>
                  </p>
                </div> -->
              </div>
            </a-tab-pane>
            <!-- 隐私设置 -->
            <a-tab-pane tab="隐私设置" key="2">
              <div class="privacy">
                <dl>
                  <dt>
                    <span>隐藏简历</span>
                    <a-checkbox @change="hideChange" :checked="is_hide">开启隐藏</a-checkbox>
                  </dt>
                  <dd>
                    <p>隐藏后，您的简历将不会推荐给HR，也无法被搜索到，只有你投递到公司才可以查看你的简历</p>
                  </dd>
                </dl>
                <dl>
                  <dt>
                    <span>匿名显示</span>
                  </dt>
                  <dd>
                    <p>选中你敏展示后,HR无法看到你的真是头像和姓名</p>
                    <a-radio-group @change="onChange" v-model="anonymous">
                      <a-radio value="0">
                        <img src="../../assets/images/tx.png" />
                        <span>{{userParams.name}}(真名展示)</span>
                      </a-radio>
                      <a-radio value="1">
                        <img src="../../assets/images/tx.png" />
                        <span>{{anonymousName}}{{sex == 1 ? '先生' : '女士'}}(匿名展示)</span>
                      </a-radio>
                    </a-radio-group>
                  </dd>
                </dl>
                <dl>
                  <dt><span>屏蔽公司</span></dt>
                  <dd>
                    <p>输入想屏蔽的公司，支持公司全称、简称</p>
                    <p>屏蔽后，此公司将无法通过人才推荐、搜索等入口看见你</p>
                    <p>屏蔽后，你将不会再各个推荐入口看见此公司职位</p>
                    <div class="privacy_input">
                      <a-input-search placeholder="请输入想屏蔽的公司全程、简称" @search="onSearch" enterButton="搜索公司" size="large" />
                    </div>
                    <div class="privacy_del" v-for="item in hideCompany" :key="item.id">
                      <span>{{item.name}}</span>
                      <a @click="del(item)">删除</a>
                    </div>
                  </dd>
                </dl>
              </div>
            </a-tab-pane>
            <!-- 修改密码 -->
            <a-tab-pane tab="修改密码" key="3">
              <div class="new_password">
                <a-row type="flex" justify="start">
                  <a-col :span="6">登录帐号</a-col>
                  <a-col :span="10">{{userInfo.username}}</a-col>
                </a-row>
                <a-form :form="form" @submit="handleSubmit">
                  <a-form-item>
                    <a-input 
                      placeholder="请输入新的密码"
                      v-decorator="[
                        'password',
                        {rules: [{ required: true, message: '请输入新的密码' }]}
                      ]"
                    ></a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-input 
                      placeholder="请再次输入新的密码"
                      v-decorator="[
                        'rePassword',
                        {rules: [{ required: true, message: '请再次输入新的密码' }]}
                      ]"
                    ></a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" html-type="submit">保存</a-button>
                  </a-form-item>
                </a-form>
              </div>
            </a-tab-pane>
        </a-tabs>
    </section>
</template>

<script>
import "./index.less";
import util from '../../plugins/utils/util';
import ajax from '../../plugins/api';
export default {
  name: "settings",
  data() {
    return {
      form: this.$form.createForm(this),
      accounts: [
        {type: 'qq', typeName: 'QQ', name: '', isBinding: false},
        {type: 'weibo', typeName: '新浪微博', name: '', isBinding: false},
        {type: 'wechat', typeName: '微信', name: 'dilireba', isBinding: true}
      ],
      userInfo: {},
      hideCompany: [],
      userParams: {},
      anonymous: null,
      is_hide: false,
      isInput: false,
      username: null,
      sex: 1,
      anonymousName: '',
      email: null,
      isEmail: false
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
   
  },
  methods: {
    init() {
      this.userInfo = util.getStore('userInfo');
      this.devHideCompany();
      this.devInfo();
    },
    handleInput(name) { //更换手机号
      if(name) {
        ajax.put('user/updatePhone', {
          user_id: this.userInfo.id,
          username: this.username
        }).then(res => {
          if(res.retcode == 0) {
            this.$router.push({
              path: '/login'
            })
          }
        })
      }else{
        this.isInput = true;
        this.username = this.userInfo.username;
      }
    },
    handleEmail() { //绑定邮箱
      if(this.email) {
        ajax.post('user/detail', {
          user_id: this.userInfo.id,
          email: this.email
        }).then(res => {
          if(res.retcode == 0) {
            this.$message.success(res.msg);
            this.devInfo();
          }
        })
      }
    },
    onChange(e) { //单选 1: 真名 2: 匿名
      ajax.post('user/detail', {
        user_id: this.userInfo.id,
        anonymous: e.target.value
      }).then(res => {
        if(res.retcode == 0) this.$message.success(res.msg);
      })
    },
    hideChange(e) {
      this.is_hide = !this.is_hide;
      ajax.post('user/detail', {
        user_id: this.userInfo.id,
        is_hide: e.target.checked ? 1 : 0
      }).then(res => {
        if(res.retcode == 0) this.$message.success(res.msg);
      })
    },
    onSearch(value) { //搜索想屏蔽的公司
      ajax.get('company/search', {
        keywords: value
      }).then(res => {
        if(res.retcode == 0) {
          this.hideCompany = res.data || [];
          this.hideCompany.map(item => {
            item.company_id = item.user_id;
          })
        };
      })
    },
    del(e) {
      ajax.post('user/hideCompany', {
        user_id: this.userInfo.id,
        company_id: e.company_id,
        is_hide: 1
      }).then(res => {
        if(res.retcode == 0) {
          this.devHideCompany();
          this.$message.success(res.msg);
        };
      })
    },
    handleSubmit(e) { //修改密码提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          ajax.put('rePassword', {
            ...values,
            username: this.userInfo.username,
            user_id: this.userInfo.id,
            type: this.userInfo.type
          }).then(res => {
            if(res.retcode == 0) this.$message.success(res.msg);
          })
        }
      });
    },
    devHideCompany() {
      ajax.get('user/hideCompany/list', {user_id: this.userInfo.id}).then(res => {
        if(res.retcode == 0) this.hideCompany = res.data || [];
      })
    },
    devInfo() {
      ajax.get('user/' + this.userInfo.id).then(res => {
        if(res.retcode == 0) {
          this.userParams = res.data || {};
          if(res.data && res.data.userInfo && res.data.userInfo.length > 0) {
            if(res.data.userInfo[0].sex) this.sex = res.data.userInfo[0].sex;
            if(res.data.userInfo[0].anonymous) this.anonymous = res.data.userInfo[0].anonymous + '';
            if(res.data.userInfo[0].is_hide) this.is_hide = res.data.userInfo[0].is_hide == 1 ? true : false;
            if(res.data.userInfo[0].email) {
              this.email = res.data.userInfo[0].email;
              this.isEmail = true;
            };
          }
          this.anonymousName = res.data.username.substr(0, 1);
        };
      })
    }
  }
};
</script>
