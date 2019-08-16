<template>
    <section class="login_form">
        <div class="goLogin">
            <a @click="goLogin">返回登录</a>
                <em></em>
            <a>
            <span>通过邮箱找回</span>
                <a-icon type="play-circle" theme="filled" />
            </a>
        </div>
        <!-- 注册tab -->
        <a-tabs v-model="active" @change="callback">
            <a-tab-pane tab="验证手机号" key="2"></a-tab-pane>
            <a-tab-pane tab="重置密码" key="3" :disabled="isDisabled"></a-tab-pane>
        </a-tabs>
        <!-- form表单 -->
        <a-form :form="form" @submit="handleSubmit">
            <!-- 输入手机号 -->
            <a-form-item v-if="active == '2'">
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
            <a-form-item v-if="active == '2'">
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
            <!-- 输入密码 -->
            <a-form-item v-if="active == '3'">
                <a-input 
                placeholder="请输入新的密码"
                type='password'
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
            <a-form-item v-if="active == '3'">
                <a-input 
                placeholder="请再次输入新的密码"
                type='password'
                v-decorator="[
                    'rePassword',
                    {
                    initialValue: params.rePassword,
                    rules: [{ required: true, message: '请再次输入新的密码' }]
                    }
                ]"
                >
                </a-input>
            </a-form-item>
            <!-- btn按钮 -->
            <a-form-item>
                <a-button type="primary" html-type="submit" v-if="active == '2'">找回密码</a-button>
                <a-button type="primary" html-type="submit" v-if="active == '3'">完成设置</a-button>
            </a-form-item>
        </a-form>
    </section>
</template>

<script>
import "./index.less";
import ajax from '../../../plugins/api';

export default {
  async asyncData(){
     return{
     };
  },
  props: ['type'],
  data() {
      return{
        form: this.$form.createForm(this), //form初始化
        params: { //input参数
          username: '',
          code: '',
          password: '',
          rePassword: ''
        },
        active: '2',
        countDown: null,
        times: null,
        isPhone: true, //手机号还是账号登录
        isDisabled: true
      }
  },
  mounted() {
  },
  methods: {
    callback(key) { //tab选择key值
      this.form.resetFields(); //清空输入框
      if(key == '2') {
        this.isDisabled = true;
      };
      this.active = key;
    },
    goLogin() { //返回登录
        this.$emit('handleShow', 1)
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
    handleSubmit(e) { //提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if(this.active == '2') {
            this.isDisabled = false;
            this.active = '3';
            this.params = Object.assign(this.params, values)
          }else{
            this.params = Object.assign(this.params, {
              ...values,
              type: this.type
            });
            ajax.put('rePassword', this.params).then(res => {
              if(res.retcode == 0) {
                this.$emit('handleOk', 4)
              }else{
                this.$message.warning(res.msg);
              }
            });
          }
        }
      });
    }
  }
};
</script>