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
            <!-- 输入邮箱 -->
            <section v-if="isShow">
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
            </section>
            <section v-else>
                <a-form-item>
                    <a-input 
                    type="password"
                    placeholder="请输入新密码"
                    v-decorator="[
                        'password',
                        {
                            rules: [{ required: true, message: '请输入新密码' }]
                        }
                    ]"
                    ></a-input>
                </a-form-item>
                <a-form-item>
                    <a-input 
                    type="password"
                    placeholder="请再次输入新密码"
                    v-decorator="[
                        'rePassword',
                        {
                            rules: [{ required: true, message: '请再次输入新密码' }]
                        }
                    ]"
                    ></a-input>
                </a-form-item>
            </section>
            <!-- btn按钮 -->
            <a-form-item>
                <a-button type="primary" html-type="submit" v-if="isShow">发送</a-button>
                <a-button type="primary" html-type="submit" v-else>确认</a-button>
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
  props: ['emailRoter'],
  data() {
      return{
        form: this.$form.createForm(this), //form初始化
        isShow: true
      }
  },
  mounted() {
      this.init();
  },
  watch: {
      emailRoter() {
          if(this.emailRoter) {
              this.isShow = false;
          }else{
              this.isShow = true;
          }
      }
  },
  methods: {
    init() {
        if(this.emailRoter) {
            this.isShow = false;
        }
    },
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
            if(this.isShow) {
                ajax.post('sendEmail', values).then(res => {
                    if(res.retcode == 0) {
                        this.$message.success(res.msg);
                        this.goLogin();
                    }else{
                        this.$message.warning(res.msg);
                    }
                });
            }else{
                ajax.put('rePassword', {
                    ...values,
                    code: this.emailRoter.code,
                    email: this.emailRoter.email
                }).then(res => {
                    if(res.retcode == 0) {
                        this.$message.success(res.msg);
                        this.goLogin();
                    }else{
                        this.$message.error('验证已过期');
                    }
                })
            }
        }
      });
    }
  }
};
</script>