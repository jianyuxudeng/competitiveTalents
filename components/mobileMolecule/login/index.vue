<template>
    <section class="login_form">
        <!-- 登录tab -->
        <a-tabs defaultActiveKey="2" @change="callback">
            <a-tab-pane tab="求职者登录" key="2"></a-tab-pane>
            <a-tab-pane tab="企业用户登录" key="3"></a-tab-pane>
        </a-tabs>
        <!-- form表单 -->
        <a-form :form="form" @submit="handleSubmit">
            <!-- 输入账号 -->
            <a-form-item v-if="!isPhone">
                <a-input 
                placeholder="请输入手机号/邮箱"
                v-decorator="[
                    'username',
                    {
                    initialValue: params.username,
                    rules: [{ required: true, message: '请输入手机号/邮箱' }]
                    }
                ]"
                ></a-input>
            </a-form-item>
            <!-- 输入密码 -->
            <a-form-item v-if="!isPhone">
                <a-input 
                placeholder="请输入密码"
                type='password'
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
                    'username',
                    {
                    initialValue: params.username,
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
                    <span slot="suffix" v-if="countDown">{{times}}</span>
                    <a slot="suffix" type="close-circle" @click="emitEmpty" v-else>获取验证码</a>
                </a-input>
            </a-form-item>
            <!-- 登录方式 -->
            <a-form-item>
                <div class="isPhone">
                    <a @click="handleClick">{{isPhone ? '账号密码登录' : '手机验证码登录'}}</a>
                    <a v-if="!isPhone" @click="retrievePassword">忘记密码？</a>
                </div>
            </a-form-item>
            <!-- btn按钮 -->
            <a-form-item>
                <a-button type="primary" html-type="submit">登录</a-button>
            </a-form-item>
            <a-form-item class="center">
                <a @click="toRegister">立即注册</a>
            </a-form-item>
        </a-form>
    </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';
import util from '../../../plugins/utils/util';

export default {
  async asyncData(){
     return{
     };
  },
  data() {
      return{
        form: this.$form.createForm(this), //form初始化
        params: { //input参数
          username: '',
          code: '',
          password: ''
        },
        active: 2,
        countDown: null,
        times: null,
        isPhone: true, //手机号还是账号登录
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
      let _phone = this.form.getFieldValue('username');
      if(_phone) {
        let param = {
          phone: _phone
        };
        let _times = 60;
        this.countDown = setInterval(() => {
          _times--;
          if(_times == 0) {
            clearInterval(this.countDown);
            this.countDown = null;
          };
          this.times = _times;
        }, 1000);
        ajax.get('sendCode', param);
      }else{
        this.$message.warning('请输入手机号');
      }
    },
    handleClick() { //切换登录模式
      this.isPhone = !this.isPhone;
      this.form.resetFields();
    },
    toRegister() { //进入注册
      this.form.resetFields();
      this.$emit('handleShow', {
        val: 2
      });
    },
    retrievePassword() { //找回密码
      this.form.resetFields();
      this.$emit('handleShow', {
        val: 3,
        type: this.active
      });
    },
    handleSubmit(e) { //提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            values = Object.assign(values, {type: this.active, loginType: this.isPhone ? 1 : 2});
            ajax.post('login', values).then(res => {
                if(res.retcode == 0) {
                    util.setStore('userInfo', res.data);
                    if(res.data.type == 2) {
                      this.$router.push({
                          path: '/mobile/resume-detail'
                      })
                    }else{
                      this.$router.push({
                          path: '/mobile/'
                      })
                    }
                }else{
                    this.$message.warning(res.msg);
                }
            });
        }
      });
    }
  }
};
</script>