<template>
    <section class="login_form">
        <!-- 注册tab -->
        <a-tabs defaultActiveKey="2" @change="callback">
            <a-tab-pane tab="求职者注册" key="2"></a-tab-pane>
            <a-tab-pane tab="企业用户注册" key="3"></a-tab-pane>
        </a-tabs>
        <!-- form表单 -->
        <a-form :form="form" @submit="handleSubmit">
            <!-- 输入手机号 -->
            <a-form-item>
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
            <!-- 输入密码 -->
            <a-form-item>
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
            <!-- 确认密码 -->
            <a-form-item>
                <a-input 
                placeholder="请再次输入密码"
                type='password'
                v-decorator="[
                    'rePassword',
                    {
                    initialValue: params.rePassword,
                    rules: [{ required: true, message: '请再次输入密码' }]
                    }
                ]"
                >
                </a-input>
            </a-form-item>
            <!-- 输入验证码 -->
            <a-form-item>
                <a-input 
                placeholder="请输入验证码"
                v-decorator="[
                    'code',
                    {
                    rules: [{ required: true, message: '请输入验证码' }]
                    }
                ]"
                >
                <a-button slot="suffix" v-if="countDown">{{times}}</a-button>
                <a slot="suffix" type="close-circle" @click="emitEmpty" v-else>获取验证码</a>
                </a-input>
            </a-form-item>
            <!-- btn按钮 -->
            <a-form-item>
                <a-button type="primary" html-type="submit">注册</a-button>
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
  data() {
      return{
        form: this.$form.createForm(this), //form初始化
        params: { //input参数
          username: '',
          code: '',
          password: '',
          rePassword: ''
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
    handleSubmit(e) { //提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            values = Object.assign(values, {type: this.active});
            ajax.post('register', values).then(res => {
                if(res.retcode == 0) {
                    this.$message.success(res.msg);
                    this.$emit('handleShow', 1)
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