<template>
    <section class="settings">
        <div class="nav-bg"></div>
        <a-tabs defaultActiveKey="1" tabPosition="left">
            <!-- 账号绑定 -->
            <a-tab-pane tab="账号绑定" key="1">
              <div class="account">
                <div class="head">
                  <a-row type="flex" justify="start">
                    <a-col :span="2">帐号</a-col>
                    <a-col :span="5">13854218755</a-col>
                    <a-col :span="4">
                      <a>更换手机号</a>
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
                    <a-checkbox>开启隐藏</a-checkbox>
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
                    <a-radio-group @change="onChange" v-model="radioValue">
                      <a-radio :value="1">
                        <img src="../../assets/images/tx.png" />
                        <span>迪丽热巴(真名展示)</span>
                      </a-radio>
                      <a-radio :value="2">
                        <img src="../../assets/images/tx.png" />
                        <span>迪丽女士(匿名展示)</span>
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
                    <div class="privacy_del">
                      <span>上海银来投资集团</span>
                      <a>删除</a>
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
                  <a-col :span="10">13846631163</a-col>
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
      radioValue: null
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
    onChange(e) { //单选 1: 真名 2: 匿名
      console.log('radio checked', e.target.value)
    },
    onSearch(value) { //搜索想屏蔽的公司
      console.log(value)
    },
    handleSubmit(e) { //修改密码提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  },
  components: {}
};
</script>
