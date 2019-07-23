<template>
  <section class="login">
      <img src="../../assets/images/login_bg.jpg" />
      <div class="login_conten">
          <!-- logo -->
          <div class="login_logo"><img src="../../assets/images/LOGO.png" /></div>
          <!-- 登录框 -->
          <div class="login_section">
              <img src="../../assets/images/login_centen.png" />
              <div class="login_form">
                <div class="goLogin">
                  <a></a>
                  <a></a>
                </div>
                <!-- 登录tab -->
                <a-tabs defaultActiveKey="1" @change="callback" v-if="isShow == 1">
                  <a-tab-pane tab="求职者登录" key="1"></a-tab-pane>
                  <a-tab-pane tab="企业用户登录" key="2"></a-tab-pane>
                </a-tabs>
                <!-- 注册tab -->
                <a-tabs defaultActiveKey="1" @change="callback" v-if="isShow == 2">
                  <a-tab-pane tab="求职者注册" key="1"></a-tab-pane>
                  <a-tab-pane tab="企业用户注册" key="2"></a-tab-pane>
                </a-tabs>
                <a-form :form="form" @submit="handleSubmit">
                  <a-form-item>
                    <a-input 
                      :placeholder="isPhone ? '请输入手机号' : '请输入手机号/邮箱'"
                      v-decorator="[
                        'phone',
                        {
                          initialValue: params.phone,
                          rules: [{ required: true, message: isPhone ? '请输入手机号' : '请输入手机号/邮箱' }]
                        }
                      ]"
                    ></a-input>
                  </a-form-item>
                  <a-form-item>
                    <a-input 
                      :placeholder="isPhone ? '请输入验证码' : '请输入密码'"
                      v-decorator="[
                        'password',
                        {
                          initialValue: params.password,
                          rules: [{ required: true, message: isPhone ? '请输入验证码' : '请输入密码' }]
                        }
                      ]"
                    >
                      <a v-if="isPhone" slot="suffix" type="close-circle" @click="emitEmpty">获取验证码</a>
                    </a-input>
                  </a-form-item>
                  <!-- 再次输入密码 注册时显示 -->
                  <a-form-item v-if="!isPhone && isShow == 2">
                    <a-input 
                      placeholder="请再次输入密码"
                      v-decorator="[
                        'password',
                        {
                          initialValue: params.password,
                          rules: [{ required: true, message: '请再次输入密码' }]
                        }
                      ]"
                    >
                    </a-input>
                  </a-form-item>
                  <a-form-item>
                    <div class="isPhone">
                      <a @click="handleClick" v-if="isShow == 1">{{isPhone ? '账号密码登录' : '手机验证码登录'}}</a>
                      <a @click="handleClick" v-if="isShow == 2">{{isPhone ? '账号密码注册' : '手机验证码注册'}}</a>
                      <a v-if="!isPhone && isShow == 1">忘记密码？</a>
                    </div>
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" html-type="submit" v-if="isShow == 1">登录</a-button>
                    <a-button type="primary" html-type="submit" v-if="isShow == 2">注册</a-button>
                  </a-form-item>
                  <a-form-item class="center" v-if="isShow == 1">
                    <a @click="toRegister">立即注册</a>
                  </a-form-item>
                </a-form>
              </div>
          </div>
          <!-- footer -->
          <div class="login_foot">WWW.ES-CAREER.COM</div>
      </div>
  </section>
</template>

<script>
import "./index.less";

export default {
  name: "login",
  async asyncData(){
     return{
     };
  },
  data() {
      return{
        form: this.$form.createForm(this), //form初始化
        params: { //input参数
          phone: '',
          password: ''
        },
        isPhone: true, //手机号还是账号登录
        isShow: 1 //1：登录   2：注册   3：找回密码
      }
  },
  mounted() {
  },
  methods: {
    callback(key) { //tab选择key值
      this.form.resetFields();
      console.log(key)
    },
    emitEmpty() { //点击发送验证码
      console.log(this.params.phone)
    },
    handleClick() { //切换登录模式
      this.isPhone = !this.isPhone;
      this.form.resetFields();
    },
    toRegister() { //进入注册
      this.form.resetFields();
      this.isShow = 2;
      this.isPhone = true;
    },
    handleSubmit(e) { //提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
  }
};
</script>