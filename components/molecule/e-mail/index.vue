<template>
    <section class="login_form">
        <div class="goLogin">
            <a @click="goLogin">返回登录</a>
            <em></em>
            <a @click="goRePassword">
                <span>通过手机找回</span>
                <a-icon type="play-circle" theme="filled" />
            </a>
        </div>
        <!-- form表单 -->
        <a-form :form="form" @submit="handleSubmit">
            <!-- 输入手机号 -->
            <a-form-item>
                <a-input 
                placeholder="请输您的邮箱"
                v-decorator="[
                    'email',
                    {
                        rules: [{ required: true, message: '请输您的邮箱' }]
                    }
                ]"
                ></a-input>
            </a-form-item>
            <!-- btn按钮 -->
            <a-form-item>
                <a-button type="primary" html-type="submit">发送</a-button>
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
        form: this.$form.createForm(this) //form初始化
      }
  },
  mounted() {
  },
  methods: {
    goLogin() { //返回登录
        this.$emit('handleShow', 1);
    },
    goRePassword() {
        this.$emit('handleShow', 3);
    },
    handleSubmit(e) { //提交
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          ajax.post('sendEmail', values).then(res => {
            if(res.retcode == 0) {
                this.$message.success(res.msg);
                this.goLogin();
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