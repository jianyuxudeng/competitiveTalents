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
                <div class="goLogin" v-if="isShow == 3">
                  <a @click="goLogin">返回登录</a>
                  <em></em>
                  <a>
                    <span>通过邮箱找回</span>
                    <a-icon type="play-circle" theme="filled" />
                  </a>
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
                <!-- 修改密码tab -->
                <a-tabs defaultActiveKey="1" @change="callback" v-if="isShow == 3">
                  <a-tab-pane tab="验证手机号" key="1"></a-tab-pane>
                  <a-tab-pane tab="重置密码" key="2"></a-tab-pane>
                </a-tabs>
                <!-- form表单 -->
                <a-form :form="form" @submit="handleSubmit">
                  <!-- 登录 -->
                  <section v-if="isShow == 1">
                    <!-- 输入账号 -->
                    <a-form-item v-if="!isPhone">
                      <a-input 
                        placeholder="请输入手机号/邮箱"
                        v-decorator="[
                          'name',
                          {
                            initialValue: params.name,
                            rules: [{ required: true, message: '请输入手机号/邮箱' }]
                          }
                        ]"
                      ></a-input>
                    </a-form-item>
                    <!-- 输入密码 -->
                    <a-form-item v-if="!isPhone">
                      <a-input 
                        placeholder="请输入密码"
                        v-decorator="[
                          'password',
                          {
                            initialValue: params.password,
                            rules: [{ required: true, message: '请输入密码' }]
                          }
                        ]"
                      >
                      </a-input>
                    </a-form-item>
                    <!-- 输入手机号 -->
                    <a-form-item v-if="isPhone">
                      <a-input 
                        placeholder="请输入手机号"
                        v-decorator="[
                          'phone',
                          {
                            initialValue: params.phone,
                            rules: [{ required: true, message: '请输入手机号' }]
                          }
                        ]"
                      ></a-input>
                    </a-form-item>
                    <!-- 输入验证码 -->
                    <a-form-item v-if="isPhone">
                      <a-input 
                        placeholder="请输入验证码"
                        v-decorator="[
                          'code',
                          {
                            initialValue: params.code,
                            rules: [{ required: true, message: '请输入验证码' }]
                          }
                        ]"
                      >
                        <a slot="suffix" type="close-circle" @click="emitEmpty">获取验证码</a>
                      </a-input>
                    </a-form-item>
                  </section>
                  <!-- 注册 -->
                  <section v-if="isShow == 2">
                    <!-- 输入账号 -->
                    <a-form-item>
                      <a-input 
                        placeholder="请输入手机号/邮箱"
                        v-decorator="[
                          'name',
                          {
                            initialValue: params.name,
                            rules: [{ required: true, message: '请输入手机号/邮箱' }]
                          }
                        ]"
                      ></a-input>
                    </a-form-item>
                    <!-- 输入密码 -->
                    <a-form-item>
                      <a-input 
                        placeholder="请输入密码"
                        v-decorator="[
                          'password',
                          {
                            initialValue: params.password,
                            rules: [{ required: true, message: '请输入密码' }]
                          }
                        ]"
                      >
                      </a-input>
                    </a-form-item>
                    <!-- 输入手机号 -->
                    <a-form-item>
                      <a-input 
                        placeholder="请输入手机号"
                        v-decorator="[
                          'phone',
                          {
                            initialValue: params.phone,
                            rules: [{ required: true, message: '请输入手机号' }]
                          }
                        ]"
                      ></a-input>
                    </a-form-item>
                    <!-- 输入验证码 -->
                    <a-form-item>
                      <a-input 
                        placeholder="请输入验证码"
                        v-decorator="[
                          'code',
                          {
                            initialValue: params.code,
                            rules: [{ required: true, message: '请输入验证码' }]
                          }
                        ]"
                      >
                        <a slot="suffix" type="close-circle" @click="emitEmpty">获取验证码</a>
                      </a-input>
                    </a-form-item>
                  </section>
                  <!-- 找回密码 -->
                  <section v-if="isShow == 3">
                    <!-- 输入手机号 -->
                    <a-form-item v-if="active == '1'">
                      <a-input 
                        placeholder="请输入手机号"
                        v-decorator="[
                          'phone',
                          {
                            initialValue: params.phone,
                            rules: [{ required: true, message: '请输入手机号' }]
                          }
                        ]"
                      ></a-input>
                    </a-form-item>
                    <!-- 输入验证码 -->
                    <a-form-item v-if="active == '1'">
                      <a-input 
                        placeholder="请输入验证码"
                        v-decorator="[
                          'code',
                          {
                            initialValue: params.code,
                            rules: [{ required: true, message: '请输入验证码' }]
                          }
                        ]"
                      >
                        <a slot="suffix" type="close-circle" @click="emitEmpty">获取验证码</a>
                      </a-input>
                    </a-form-item>
                    <!-- 输入密码 -->
                    <a-form-item v-if="active == '2'">
                      <a-input 
                        placeholder="请输入新的密码"
                        v-decorator="[
                          'password',
                          {
                            initialValue: params.password,
                            rules: [{ required: true, message: '请输入新的密码' }]
                          }
                        ]"
                      >
                      </a-input>
                    </a-form-item>
                    <!-- 再次输入密码 -->
                    <a-form-item v-if="active == '2'">
                      <a-input 
                        placeholder="请再次输入新的密码"
                        v-decorator="[
                          'newPassword',
                          {
                            initialValue: params.newPassword,
                            rules: [{ required: true, message: '请再次输入新的密码' }]
                          }
                        ]"
                      >
                      </a-input>
                    </a-form-item>
                  </section>
                  <a-form-item>
                    <div class="isPhone">
                      <a @click="handleClick" v-if="isShow == 1">{{isPhone ? '账号密码登录' : '手机验证码登录'}}</a>
                      <a v-if="!isPhone && isShow == 1" @click="retrievePassword">忘记密码？</a>
                    </div>
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" html-type="submit" v-if="isShow == 1">登录</a-button>
                    <a-button type="primary" html-type="submit" v-if="isShow == 2">注册</a-button>
                    <section v-if="isShow == 3">
                      <a-button type="primary" html-type="submit" v-if="active == '1'">找回密码</a-button>
                      <a-button type="primary" html-type="submit" v-if="active == '2'">完成设置</a-button>
                    </section>
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
        active: 1,
        params: { //input参数
          name: '',
          phone: '',
          code: '',
          password: '',
          newPassword: ''
        },
        isPhone: true, //手机号还是账号登录
        isShow: 1 //1：登录   2：注册   3：找回密码
      }
  },
  mounted() {
  },
  methods: {
    callback(key) { //tab选择key值
      this.form.resetFields(); //清空输入框
      this.active = key;
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
    goLogin() { //返回登录
      this.form.resetFields();
      this.isShow = 1;
      this.isPhone = true;
    },
    retrievePassword() { //找回密码
      this.form.resetFields();
      this.isShow = 3;
      this.isPhone = true;
    },
    handleSubmit(e) { //提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          switch (this.isShow) {
            case 1:
              
              break;
            case 2:
              this.form.resetFields();
              this.isShow = 1;
              break;
          
            default:
              break;
          }
          console.log('Received values of form: ', values);
        }
      });
    }
  }
};
</script>